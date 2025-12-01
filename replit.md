# MaxTech - IT Solutions and Services Website

## Overview
MaxTech is a professional IT solutions and services website template featuring a modern design with Bootstrap, jQuery, and various interactive components. This is a static HTML website with a PHP backend for contact form handling.

## Project Structure
- **HTML Pages**: index.html, about.html, contact.html, services.html, study-case.html, news.html
- **CSS**: Bootstrap 5, custom styles, Swiper carousel, icon fonts (FontAwesome 4 & 6, Elegant Icon Font)
- **JavaScript**: jQuery, Bootstrap, Swiper, Isotope, Magnific Popup, WOW.js animations
- **PHP Backend**: Form handler (handler.php) with validation, email sending, and reCAPTCHA support
- **Dependencies**: PHP Composer packages (FormGuide, PHPMailer, Gregwar Captcha)

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (jQuery)
- **Backend**: PHP 8.3
- **Server**: PHP built-in development server
- **Libraries**: 
  - Bootstrap 5.0.2
  - jQuery 3.7.1
  - Swiper.js
  - Font Awesome 4 & 6
  - Isotope
  - Magnific Popup
  - WOW.js

## Development Setup
The project runs on PHP's built-in development server:
- **Host**: 0.0.0.0
- **Port**: 5000
- **Command**: `php -S 0.0.0.0:5000`

## Features
1. **Homepage**: Hero slider with company vision and services overview
2. **Services**: IT solution offerings (Custom Software, Web Apps, Mobile Apps, Full-Stack)
3. **Study Cases**: Portfolio/case study showcases
4. **About Us**: Team members and company information
5. **News**: Blog/news section
6. **Contact Form**: PHP-powered contact form with validation and email delivery

## Form Handler Configuration
The contact form uses FormGuide PHP library. To enable form submissions:
1. Edit `handler.php`
2. Update line 26: Replace `'your-email-here'` with your actual email address
3. Update line 23: Replace `'copy-your-secret-key-here'` with your Google reCAPTCHA secret key
4. Obtain reCAPTCHA keys from: https://www.google.com/recaptcha/admin

## Deployment
- **Type**: VM deployment (always running)
- **Command**: `php -S 0.0.0.0:5000`
- The website can be published to get a live URL accessible to anyone

## Current State (December 1, 2025)
- ✅ PHP 8.3 installed via Nix packages
- ✅ Composer dependencies available in vendor directory
- ✅ Web server configured and running on port 5000
- ✅ All pages loading correctly with full styling
- ✅ Deployment configuration set up for VM hosting

## Notes
- This is a template website with placeholder content
- Contact form requires email and reCAPTCHA configuration to function
- The `.htaccess` file contains a redirect to `maxtechbd.com` - remove or update this for your own domain
- Static assets (images, fonts, CSS, JS) are all included and functional
