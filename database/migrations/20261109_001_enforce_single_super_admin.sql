BEGIN;

-- The existing Platform Super Admin must remain the only account
-- holding this role. Stop the migration if the current data is unexpected.
DO $$
DECLARE
    super_admin_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO super_admin_count
    FROM public.admins
    WHERE role = 'super_admin';

    IF super_admin_count <> 1 THEN
        RAISE EXCEPTION
            'Expected exactly one Platform Super Admin before applying this migration. Found %.',
            super_admin_count;
    END IF;
END
$$;

-- Enforce one Super Admin across all administrator records.
CREATE UNIQUE INDEX IF NOT EXISTS admins_single_super_admin_idx
    ON public.admins (role)
    WHERE role = 'super_admin';

COMMIT;
