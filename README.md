# Blog-Web-Application

Welcome to Blogopia! This is a simple blog application built with Express.js and EJS templating, designed to allow users to create, view, edit, and delete blog posts.

Features

Home Page: Displays a list of all blog post titles.

Create Post: Allows users to create a new blog post with a title and content.

View Post: Allows users to view a specific blog post by title.

Edit Post: Allows users to edit an existing blog post's title and content.

Delete Post: Allows users to delete a blog post.

FAQs: Provides a page with frequently asked questions about the application.

About: Displays information about the developer.

Limitations

Single User: The application does not support multiple users or authentication.

In-Memory Storage: Posts are stored in memory; they will be lost if the server is restarted.

No Pagination: All posts are displayed on the home page without pagination.

Limited Error Handling: Basic error handling is implemented; edge cases and detailed error messages are minimal.

Prerequisites

Ensure you have the following installed on your machine:
Node.js (v14 or higher)
npm (Node package manager, comes with Node.js)

Installation
1. Clone the Repository
2. npm install
3. node index.js
By default, the application will be available at http://localhost:3000.

Usage

Home Page: Access the home page to view a list of all blog post titles.

Create Post: Navigate to /createPost to create a new blog post.

View Post: Click on a post title from the home page to view the full content.

Edit Post: On a post page, use the "Edit Post" button to modify the post.

Delete Post: On a post page, use the "Delete Post" button to remove the post.

FAQs: Access the FAQs page at /FAQ.

About: Learn more about the developer at /about.

File Structure

index.js: Main server file.

views/: Contains EJS templates.

index.ejs: Home page template.

create.ejs: Template for creating/editing posts.

blog.ejs: Template for viewing a single post.

FAQ.ejs: FAQ page template.

about.ejs: About page template.

partials/: Contains header and footer partials used across pages.

public/styles/: Contains CSS files for styling.

main.css: Main stylesheet.
