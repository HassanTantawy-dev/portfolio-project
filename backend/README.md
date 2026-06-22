# Portfolio Website - Setup & Usage Guide

## ✨ Features

- **Fullstack PHP Development Focus**
- **Responsive Design** - Works on all devices
- **Dark Mode** - Toggle between light and dark themes
- **Contact Form with Validation** - Frontend & Backend validation
- **Database Integration** - MySQL database for storing messages
- **Spam Protection** - Prevents duplicate submissions within 5 minutes
- **Email Validation** - Real-time and server-side email verification
- **Skill Cards** - Right-to-left layout support
- **Multiple Sections** - About, Skills, Projects, Education, Experience, Services, Contact

---

## 🚀 Setup Instructions

### 1. **Database Setup**

#### Option A: Using phpMyAdmin

1. Open phpMyAdmin in your browser (usually `http://localhost/phpmyadmin`)
2. Click on "SQL" tab
3. Copy and paste the contents of `backend/database-setup.sql`
4. Click "Go" to execute

#### Option B: Using MySQL Command Line

```bash
mysql -u root -p < backend/database-setup.sql
```

#### Option C: Manual Setup

1. Create a database named `portfolio_db`
2. Create a table named `messages` with the following columns:
   - `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
   - `name` (VARCHAR 100)
   - `email` (VARCHAR 100)
   - `subject` (VARCHAR 200)
   - `message` (LONGTEXT)
   - `created_at` (TIMESTAMP, DEFAULT: CURRENT_TIMESTAMP)
   - `status` (ENUM: 'new', 'read', 'replied', DEFAULT: 'new')

### 2. **Configure Database Connection**

Edit `backend/config.php` and update these variables:

```php
$db_host = 'localhost';      // Your database host
$db_user = 'root';           // Your database username
$db_pass = '';               // Your database password
$db_name = 'portfolio_db';   // Your database name
```

### 3. **File Permissions**

Make sure the `backend/` folder is writable for error logs:

```bash
chmod 755 backend/
```

---

## 📋 Form Validation Rules

### Frontend Validation (JavaScript)

- **Name**: 2-100 characters, letters only
- **Email**: Valid email format
- **Subject**: 3-200 characters
- **Message**: 10-5000 characters

### Backend Validation (PHP)

- Same as frontend
- Additional security checks
- SQL injection prevention
- Spam detection

---

## 🔒 Security Features

1. **Input Sanitization** - All inputs are sanitized to prevent XSS attacks
2. **Prepared Statements** - Database queries use prepared statements
3. **Email Validation** - Both client-side and server-side validation
4. **Spam Protection** - Limits messages from same email to 1 per 5 minutes
5. **Error Logging** - Errors are logged to `backend/error_log.txt`
6. **CORS Headers** - Configured for secure API access

---

## 📧 Email Configuration (Optional)

To enable email notifications when you receive a message:

1. Edit `backend/send-message.php`
2. Uncomment the email sending section (lines around 120-130)
3. Update the recipient email address
4. Configure your PHP mail settings in `php.ini`

```php
// Example:
mail($to, $email_subject, $email_body, $headers);
```

---

## 🎨 Customization

### Skills Section

Edit the skill cards in `index.html`:

```html
<div class="skill-card wow fadeInLeftBig">
  <img src="img/your-image.png" alt="Your Skill" />
  <h4>Your Skill Name</h4>
</div>
```

### Projects Section

Add new projects in `index.html`:

```html
<div class="project-card wow fadeInUp">
  <a href="your-project-link" class="project-link">
    <img src="img/project-image.png" alt="Project Name" />
  </a>
  <div class="project-body">
    <h4>Project Name</h4>
    <p>Project description</p>
    <div class="tech-tags">
      <span>Technology 1</span>
      <span>Technology 2</span>
    </div>
  </div>
</div>
```

### Education Section

Update your education details in `index.html`:

```html
<div class="education-card">
  <h4>🎓 Your Degree</h4>
  <p>Your University | Graduation Year</p>
</div>
```

---

## 📊 Viewing Submitted Messages

### Using phpMyAdmin

1. Open phpMyAdmin
2. Select database `portfolio_db`
3. Click on `messages` table
4. Browse data in "Browse" tab

### Using MySQL Command Line

```bash
mysql -u root -p portfolio_db
SELECT * FROM messages ORDER BY created_at DESC;
```

---

## 🐛 Troubleshooting

### Messages not being saved

- Check database connection in `backend/config.php`
- Verify database and table exist
- Check `backend/error_log.txt` for errors
- Ensure `backend/` folder has write permissions

### Form not submitting

- Check browser console for JavaScript errors
- Verify SweetAlert2 is loaded
- Check network tab in DevTools
- Ensure `form-handler.js` is loaded

### Database connection error

- Verify MySQL service is running
- Check username and password
- Ensure database exists
- Check database name spelling

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

---

## 🎯 Key Sections

- **About** - Your introduction as a Fullstack PHP Developer
- **Skills** - Your technical skills with RTL layout
- **Projects** - Your portfolio projects
- **Education** - Your educational background
- **Experience** - Your work experience
- **Services** - Services you offer
- **Contact** - Contact form with validation and database storage

---

## 📄 Files Structure

```
portfolio-project/
├── index.html
├── css/
│   ├── style2.css
│   ├── new-styles.css
│   ├── bootstrap.min.css
│   ├── animate.min.css
│   └── all.min.css
├── js/
│   ├── main2.js
│   ├── form-handler.js
│   ├── bootstrap.min.js
│   └── wow.min.js
├── img/
│   └── (Your images)
├── backend/
│   ├── config.php (Database configuration)
│   ├── send-message.php (Form handler)
│   ├── database-setup.sql (SQL setup script)
│   └── error_log.txt (Error logs)
└── webfonts/
    └── (Font files)
```

---

## 🤝 Support

For issues or questions:

1. Check the error log: `backend/error_log.txt`
2. Review the console in browser DevTools
3. Verify all file paths are correct
4. Ensure database configuration is correct

---

## ✅ Version History

- **v2.0** - Added PHP backend, database integration, form validation
- **v1.0** - Initial portfolio website

---

## 📝 License

This portfolio is for personal use. Feel free to customize it as needed!

---

**Last Updated**: June 2026
