BEGIN;

-- Individual invitation attempts. Resending creates a new record,
-- preserving the history of previous invitations.
CREATE TABLE IF NOT EXISTS public.admin_invitations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id uuid REFERENCES public.admins(id) ON DELETE SET NULL,
    email text NOT NULL,
    invited_by uuid REFERENCES public.admins(id) ON DELETE SET NULL,
    resend_of uuid REFERENCES public.admin_invitations(id) ON DELETE SET NULL,
    status text NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
    expires_at timestamptz NOT NULL,
    accepted_at timestamptz,
    revoked_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_invitations_email_created
    ON public.admin_invitations (lower(email), created_at DESC);

-- Prevent multiple simultaneously pending invitations for one email.
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_invitations_one_pending_per_email
    ON public.admin_invitations (lower(email))
    WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_admin_invitations_admin_created
    ON public.admin_invitations (admin_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_invitations_pending_expiry
    ON public.admin_invitations (expires_at)
    WHERE status = 'pending';

-- One record per Supabase Auth session. Session identifiers are not
-- access tokens and must never be used as bearer credentials.
CREATE TABLE IF NOT EXISTS public.admin_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id uuid NOT NULL REFERENCES public.admins(id) ON DELETE CASCADE,
    supabase_session_id uuid NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    last_seen_at timestamptz NOT NULL DEFAULT now(),
    ended_at timestamptz,
    revoked_at timestamptz,
    user_agent text,
    CONSTRAINT admin_sessions_terminal_state_check
        CHECK (ended_at IS NULL OR revoked_at IS NULL)
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_created
    ON public.admin_sessions (admin_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_active_heartbeat
    ON public.admin_sessions (last_seen_at DESC)
    WHERE ended_at IS NULL AND revoked_at IS NULL;

-- Extend the existing activity log instead of creating a second audit log.
DO $$
DECLARE
    constraint_record record;
BEGIN
    FOR constraint_record IN
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'public.admin_activity_log'::regclass
          AND contype = 'c'
          AND pg_get_constraintdef(oid) ILIKE '%entity_type%'
    LOOP
        EXECUTE format(
            'ALTER TABLE public.admin_activity_log DROP CONSTRAINT %I',
            constraint_record.conname
        );
    END LOOP;
END;
$$;

ALTER TABLE public.admin_activity_log
    ADD CONSTRAINT admin_activity_log_entity_type_check
    CHECK (entity_type IN ('product', 'order', 'admin'));

CREATE INDEX IF NOT EXISTS idx_admin_activity_log_admin_events
    ON public.admin_activity_log (created_at DESC, id DESC)
    WHERE entity_type = 'admin';

CREATE INDEX IF NOT EXISTS idx_admin_activity_log_event_type
    ON public.admin_activity_log (event_type, created_at DESC);

-- These tables are accessed by trusted backend code, not browser clients.
ALTER TABLE public.admin_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.admin_invitations FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.admin_sessions FROM PUBLIC, anon, authenticated;

COMMIT;
