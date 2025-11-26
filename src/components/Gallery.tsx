import React, { useState } from 'react';
import ProjectModal from './modals/ProjectModal';
import styles from './Gallery.module.css';

interface Project {
  id: number;
  title: string;
  location: string;
  stats: string;
  images: string[];
  problem: string;
  solution: string;
  services: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
  duration: string;
  scope: string;
}

const Gallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    { 
      id: 1, 
      title: 'Nelspruit Shopping Complex', 
      location: 'Mpumalanga, Nelspruit',
      stats: '98% crime reduction',
      images: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'The shopping complex was experiencing frequent break-ins, shoplifting incidents, and vehicle theft in the parking areas. Security cameras were outdated and provided poor coverage, while the access control system was ineffective.',
      solution: 'We implemented a comprehensive security overhaul including 32 high-definition CCTV cameras with night vision, automated license plate recognition in parking areas, biometric access control for staff entrances, and integrated alarm systems with 24/7 monitoring.',
      services: ['CCTV Installation', 'Access Control', 'Alarm Systems', '24/7 Monitoring'],
      testimonial: {
        text: 'moreGenz Security transformed our shopping complex from a high-risk area to one of the safest retail centers in Mpumalanga. Their professional approach and cutting-edge technology made all the difference.',
        author: 'James Wilson',
        position: 'Center Manager, Nelspruit Mall'
      },
      duration: '3 Weeks',
      scope: 'Complete retail security overhaul'
    },
    { 
      id: 2, 
      title: 'Sandton Corporate Tower', 
      location: 'Gauteng, Johannesburg',
      stats: '500+ employees secured',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'The corporate tower lacked proper access control, allowing unauthorized individuals to enter sensitive areas. Existing surveillance had blind spots, and there was no integration between different security systems.',
      solution: 'Deployed a fully integrated security system featuring facial recognition access control, 360-degree CCTV coverage across all floors and parking levels, visitor management systems, and centralized monitoring from the building\'s security operations center.',
      services: ['Biometric Access', 'CCTV Systems', 'Network Infrastructure', 'Security Integration'],
      testimonial: {
        text: 'The security transformation has given our employees peace of mind and our management team complete confidence in our building\'s safety protocols.',
        author: 'Sarah Johnson',
        position: 'Facilities Director'
      },
      duration: '4 Weeks',
      scope: 'Corporate security implementation'
    },
    { 
      id: 3, 
      title: 'Durban Harbour Facility', 
      location: 'KwaZulu-Natal, Durban',
      stats: '24/7 port security',
      images: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581938452343-04b63f4d3b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'Critical port infrastructure was vulnerable to unauthorized access and theft. The perimeter security was inadequate, and there was no real-time monitoring of high-security zones containing valuable cargo and equipment.',
      solution: 'Implemented a multi-layered security approach including thermal imaging cameras for perimeter monitoring, access control with dual authentication for restricted areas, intrusion detection systems, and a dedicated 24/7 monitoring station with direct links to port authorities.',
      services: ['Perimeter Security', 'Access Control', '24/7 Monitoring', 'Critical Infrastructure'],
      testimonial: {
        text: 'moreGenz Security\'s understanding of port operations and their technical expertise has significantly enhanced our security posture while maintaining operational efficiency.',
        author: 'Captain Raj Patel',
        position: 'Port Operations Manager'
      },
      duration: '6 Weeks',
      scope: 'Port security enhancement'
    },
    { 
      id: 4, 
      title: 'Cape Town Waterfront', 
      location: 'Western Cape, Cape Town',
      stats: 'Zero major incidents',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'The popular tourist destination faced challenges with petty crime while needing to maintain an open and welcoming atmosphere. Existing security measures were either too intrusive or insufficient.',
      solution: 'Deployed discreet high-definition surveillance cameras integrated with AI-powered analytics to detect suspicious behavior, implemented rapid response teams strategically positioned throughout the area, and installed emergency call points connected to a central security operations center.',
      services: ['Discreet Surveillance', 'Rapid Response', 'Public Area Security', 'Tourist Safety'],
      testimonial: {
        text: 'They achieved the perfect balance between effective security and maintaining our waterfront\'s welcoming atmosphere. Tourist feedback has been overwhelmingly positive.',
        author: 'Michelle van der Merwe',
        position: 'Tourism Operations Manager'
      },
      duration: '2 Weeks',
      scope: 'Public space security'
    },
    { 
      id: 5, 
      title: 'Polokwane Industrial Park', 
      location: 'Limpopo, Polokwane',
      stats: '100% coverage achieved',
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'Multiple manufacturing facilities within the industrial park were experiencing equipment theft and unauthorized access after hours. The scale of the area made comprehensive security coverage challenging with existing systems.',
      solution: 'Created a unified security network across all facilities featuring perimeter intrusion detection, automated gate access control, high-resolution cameras with night vision covering all operational areas, and a centralized monitoring system accessible to all tenant security teams.',
      services: ['Industrial Security', 'Access Control', 'Perimeter Protection', 'Asset Security'],
      testimonial: {
        text: 'The collaborative approach and seamless integration across multiple facilities has created a security ecosystem that benefits all businesses in our industrial park.',
        author: 'Thomas Bhengu',
        position: 'Industrial Park Management'
      },
      duration: '5 Weeks',
      scope: 'Industrial security implementation'
    },
    { 
      id: 6, 
      title: 'Bloemfontein Medical Center', 
      location: 'Free State, Bloemfontein',
      stats: 'Enhanced patient safety',
      images: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      problem: 'The healthcare facility needed to balance open access for patients and visitors with securing sensitive areas like pharmacies, storage rooms, and staff-only zones. Previous security measures were either too restrictive or inadequate.',
      solution: 'Implemented a tiered access control system allowing free movement in public areas while securing sensitive zones with biometric authentication. Installed discreet surveillance in patient areas respecting privacy, panic buttons in high-risk zones, and integrated the security system with the hospital\'s existing emergency protocols.',
      services: ['Healthcare Security', 'Access Control', 'Patient Safety', 'Emergency Systems'],
      testimonial: {
        text: 'Their understanding of healthcare security needs was exceptional. The systems protect our patients and staff without creating a fortress-like environment.',
        author: 'Dr. Michael Roberts',
        position: 'Hospital Administrator'
      },
      duration: '3 Weeks',
      scope: 'Healthcare facility security'
    },
  ];

  const handleCaseStudyClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Work</h2>
        <p className={styles.sectionSubtitle}>
          Based in Benoni, Gauteng, we deliver professional security solutions across South Africa. 
          Our nationwide reach demonstrates our commitment to securing businesses wherever they operate.
        </p>
        <div className={styles.galleryGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImage}>
                <img 
                  src={project.images[0]} 
                  alt={`Security project at ${project.title}`}
                  className={styles.projectImg}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/800/600?random=${project.id}`;
                    e.currentTarget.alt = `${project.title} security project`;
                  }}
                />
                <div className={styles.projectOverlay}>
                  <span 
                    className={styles.viewProject}
                    onClick={() => handleCaseStudyClick(project)}
                  >
                    Case Study
                  </span>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectLocation}>{project.location}</p>
                <div className={styles.projectStats}>
                  <span className={styles.statsValue}>{project.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Gallery;
