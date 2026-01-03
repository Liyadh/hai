# **App Name**: West Gudur Admin Portal

## Core Features:

- Login Authentication: Authenticate admin users (super admin and admins) via email and password.
- Form Validation: Real-time validation of email and password fields with appropriate error handling and UI feedback.
- Session Management: Manage user sessions using local storage for token and user data, with 'remember me' functionality via cookies for extended sessions.
- Forgot Password: Implement a 'forgot password' feature with email input, API endpoint for reset link, and success message display.
- Error Handling: Display animated error alerts for invalid credentials, network failures, and other issues with auto-hide functionality.
- Responsive Design: Ensure the login screen is responsive and adapts to different screen sizes (mobile, tablet, desktop) with appropriate layout adjustments.
- Accessibility: Ensure the login screen is fully accessible with keyboard navigation, ARIA labels, screen reader support, high contrast mode, and focus visibility.

## Style Guidelines:

- Primary color: Deep Navy (#1E40AF) to represent trust and professionalism.
- Background color: A very light gray (#F2F4F7) to create a clean and modern look.
- Accent color: A subdued periwinkle blue (#737EC3) for interactive elements, complementing the primary color.
- Body and headline font: 'Inter' sans-serif for clear and accessible typography. Note: currently only Google Fonts are supported.
- Use Lucide React icons for a clean and modern aesthetic.
- Implement a glassmorphism login card with backdrop blur and subtle dot pattern overlay for a modern design.
- Use subtle animations for input focus, button hover, error alerts, and card entrance to enhance the user experience.