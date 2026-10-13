import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Tag, 
  BookOpen, 
  Sparkles, 
  Search,
  Filter
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import './BlogPage.css';

export default function BlogPage({ setActivePage, openAppointmentModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Digital Marketing', 'Oral Health', 'Orthodontics'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="blog-listing-page">
      {/* Blog Page Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="badge-tag">Knowledge & Insights</div>
          <h1 className="page-hero-title">Dental Health Blogs & Insights</h1>
          <p className="page-hero-subtitle">
            Expert articles, patient education guides, and evidence-based digital healthcare strategies from Firoz Dental Hospital, Tirupati.
          </p>
        </div>
      </section>

      {/* Main Blog Listing */}
      <section className="section-padding">
        <div className="container">
          {/* Featured Post Card */}
          <div className="featured-blog-hero card">
            <div className="fb-image-box">
              <img src={featuredPost.image} alt={featuredPost.title} className="fb-img" />
              <span className="fb-badge">Featured Guide</span>
            </div>
            <div className="fb-content">
              <div className="fb-meta">
                <span className="fb-category">{featuredPost.category}</span>
                <span>•</span>
                <span className="fb-date"><Calendar size={13} /> {featuredPost.date}</span>
                <span>•</span>
                <span className="fb-author"><User size={13} /> By {featuredPost.author}</span>
              </div>
              <h2 className="fb-title" onClick={() => setActivePage('blog-article')}>
                {featuredPost.title}
              </h2>
              <p className="fb-excerpt">{featuredPost.excerpt}</p>
              <div className="fb-highlights-preview">
                <strong>Key Topics:</strong> Target Audience & Patient Personas • Dental SEO Keyword Research • Competitor Analysis • Landing Page Blueprint • KPIs
              </div>
              <div className="fb-footer">
                <button 
                  className="btn btn-primary"
                  onClick={() => setActivePage('blog-article')}
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={16} />
                </button>
                <span className="read-time-pill"><Clock size={13} /> {featuredPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="blog-filter-bar">
            <div className="filter-group">
              <span className="filter-label">Filter by Topic:</span>
              <div className="filter-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`blog-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="blog-posts-grid">
            {filteredPosts.map((post) => (
              <div key={post.id} className="blog-card card">
                <div className="blog-card-thumb-wrap">
                  <img src={post.image} alt={post.title} className="blog-card-thumb" />
                  <span className="blog-cat-pill">{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span><Calendar size={12} /> {post.date}</span>
                    <span>•</span>
                    <span><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h3 
                    className="blog-card-title" 
                    onClick={() => setActivePage(post.id === 'digital-marketing-strategy-dental-clinic' ? 'blog-article' : 'blog')}
                  >
                    {post.title}
                  </h3>
                  <p className="blog-card-desc">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <button 
                      className="blog-read-link"
                      onClick={() => setActivePage(post.id === 'digital-marketing-strategy-dental-clinic' ? 'blog-article' : 'blog')}
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </button>
                    <span className="author-name">By {post.author.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA */}
          <div className="blog-cta-box card">
            <div className="blog-cta-content">
              <h3>Have Questions About Your Dental Health?</h3>
              <p>Schedule an in-person consultation with Dr. P. Firoz Babu (MDS) at Municipal Office Junction, Tirupati.</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={openAppointmentModal}>
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
