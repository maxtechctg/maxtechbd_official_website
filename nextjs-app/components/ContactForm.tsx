'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <form 
      name="contactForm" 
      id="contact_form" 
      className="position-relative z1000" 
      onSubmit={handleSubmit}
    >
      <div className="row gx-4">
        <div className="col-lg-6 col-md-6 mb10">
          <div className="field-set">
            <span className="d-label">Name</span>
            <input 
              type="text" 
              name="Name" 
              id="name" 
              className="form-control" 
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="field-set">
            <span className="d-label">Email</span>
            <input 
              type="email" 
              name="Email" 
              id="email" 
              className="form-control" 
              placeholder="Your Email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="field-set">
            <span className="d-label">Phone</span>
            <input 
              type="text" 
              name="phone" 
              id="phone" 
              className="form-control" 
              placeholder="Your Phone" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
        
        <div className="col-lg-6 col-md-6">
          <div className="field-set mb20">
            <span className="d-label">Message</span>
            <textarea 
              name="message" 
              id="message" 
              className="form-control" 
              placeholder="Your Message" 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
        </div>
      </div>
        
      <div id="submit" className="mt20">
        <input 
          type="submit" 
          id="send_message" 
          value={status === 'loading' ? 'Sending...' : 'Send Message'} 
          className="btn-main"
          disabled={status === 'loading'}
        />
      </div>

      {status === 'success' && (
        <div id="success_message" className="success" style={{ display: 'block' }}>
          Your message has been sent successfully. Refresh this page if you want to send more messages.
        </div>
      )}
      
      {status === 'error' && (
        <div id="error_message" className="error" style={{ display: 'block' }}>
          {errorMessage}
        </div>
      )}
    </form>
  );
}
