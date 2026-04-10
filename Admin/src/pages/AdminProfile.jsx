// AdminProfile.jsx
import React, { useState } from 'react';
import styles from './AdminProfile.module.css';
import axios from "axios";
import { useEffect } from "react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [admin, setAdmin] = useState(null);

  const [formData, setFormData] = useState({});

  const handleSave = async (e) => {
  e.preventDefault();

  try {
    const updatedData = {
      _id: admin._id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      jobTitle: formData.title
    };

    const res = await axios.put(
      "http://localhost:5000/api/admin/update-adminData",
      updatedData
    );

    if (res.data.success) {
      alert("Profile updated successfully");

      // Update UI
      setAdmin({
        ...admin,
        personal: {
          ...admin.personal,
          ...formData
        }
      });

      setIsEditing(false);
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleToggleChange = (e) => {
    setAdmin({ ...admin, security: { ...admin.security, twoFactor: e.target.checked } });
  };


  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  useEffect(() => {
  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/get-adminData");

      if (res.data.success) {
        const data = res.data.admin;

        // Convert DB structure → your UI structure
        setAdmin({
          _id: data._id,
          personal: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            location: data.location,
            title: data.jobTitle,
            department: "IT Infrastructure",
            employeeId: "EMP-8842",
            joinDate: "March 15, 2026",
            timezone: "PST (UTC-8)"
          },
          professional: {
            role: "Lead Administrator",
            experience: "8+ years",
            projects: 24,
            certificates: ["AWS Certified", "Azure Expert", "Security+"]
          },
          security: {
            twoFactor: true,
            lastLogin: "2026-04-15 09:30 AM",
            devices: ["Chrome on Windows", "Safari on iOS"]
          }
        });

        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          location: data.location,
          title: data.jobTitle
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchAdmin();
}, []);

  return admin ? (
    <div className={styles.container}>
      <div className={styles.profilePanel}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Admin Profile</h1>
            <p className={styles.subtitle}>Manage your account settings and preferences</p>
          </div>
          <button 
            className={styles.editButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5603AQG9UgVJz_354Q/profile-displayphoto-scale_200_200/B56ZzyOqEMJwAY-/0/1773590456175?e=1776902400&v=beta&t=h-Nkz8p4veAX2MPEjLCQs6fntJVgD6LCSn977Wu0GUY" 
                  alt="Admin"
                  className={styles.avatar}
                />
                <div className={styles.statusBadge}></div>
              </div>
              <h3 className={styles.adminName}>{admin.personal.firstName} {admin.personal.lastName}</h3>
              <p className={styles.adminRole}>{admin.personal.title}</p>
            </div>

            <nav className={styles.nav}>
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`${styles.navItem} ${activeSection === section.id ? styles.activeNav : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className={styles.navIcon}>{section.icon}</span>
                  <span className={styles.navLabel}>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {!isEditing ? (
              <>
                {/* Personal Information Section */}
                {activeSection === 'personal' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <h2>Personal Information</h2>
                      <p>Your basic information and contact details</p>
                    </div>
                    
                    <div className={styles.infoGrid}>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Full Name</div>
                        <div className={styles.infoValue}>{admin.personal.firstName} {admin.personal.lastName}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Email Address</div>
                        <div className={styles.infoValue}>{admin.personal.email}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Phone Number</div>
                        <div className={styles.infoValue}>{admin.personal.phone}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Location</div>
                        <div className={styles.infoValue}>{admin.personal.location}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Department</div>
                        <div className={styles.infoValue}>{admin.personal.department}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Employee ID</div>
                        <div className={styles.infoValue}>{admin.personal.employeeId}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Join Date</div>
                        <div className={styles.infoValue}>{admin.personal.joinDate}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Timezone</div>
                        <div className={styles.infoValue}>{admin.personal.timezone}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Information Section */}
                {activeSection === 'professional' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <h2>Professional Information</h2>
                      <p>Your work experience and credentials</p>
                    </div>
                    
                    <div className={styles.infoGrid}>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Current Role</div>
                        <div className={styles.infoValue}>{admin.professional.role}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Years of Experience</div>
                        <div className={styles.infoValue}>{admin.professional.experience}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Projects Completed</div>
                        <div className={styles.infoValue}>{admin.professional.projects}</div>
                      </div>
                      <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>Certifications</div>
                        <div className={styles.infoValue}>
                          <div className={styles.certificateList}>
                            {admin.professional.certificates.map((cert, idx) => (
                              <span key={idx} className={styles.certificate}>{cert}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.statsCards}>
                      <div className={styles.statCard}>
                        <div className={styles.statNumber}>24</div>
                        <div className={styles.statDesc}>Active Projects</div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statNumber}>98%</div>
                        <div className={styles.statDesc}>Success Rate</div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statNumber}>15</div>
                        <div className={styles.statDesc}>Team Members</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Section */}
                {activeSection === 'security' && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <h2>Security Settings</h2>
                      <p>Manage your account security and devices</p>
                    </div>
                    
                    <div className={styles.securitySettings}>
                      <div className={styles.securityItem}>
                        <div className={styles.securityInfo}>
                          <div className={styles.securityIcon}>🔐</div>
                          <div>
                            <h4>Two-Factor Authentication</h4>
                            <p>Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <label className={styles.toggleSwitch}>
                          <input type="checkbox" checked={admin.security.twoFactor} onChange={handleToggleChange} />
                          <span className={styles.toggleSlider}></span>
                        </label>
                      </div>

                      <div className={styles.securityItem}>
                        <div className={styles.securityInfo}>
                          <div className={styles.securityIcon}>🖥️</div>
                          <div>
                            <h4>Recent Login</h4>
                            <p>{admin.security.lastLogin}</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.securityItem}>
                        <div className={styles.securityInfo}>
                          <div className={styles.securityIcon}>📱</div>
                          <div>
                            <h4>Trusted Devices</h4>
                            <p>{admin.security.devices.join(' • ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Edit Form
              <form onSubmit={handleSave} className={styles.editForm}>
                <div className={styles.formHeader}>
                  <h2>Edit Profile</h2>
                  <p>Update your personal information</p>
                </div>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : <h1>Loading...</h1>
};

export default AdminProfile;