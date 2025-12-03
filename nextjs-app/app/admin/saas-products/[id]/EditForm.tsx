'use client';
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import VideoUpload from '@/components/admin/VideoUpload';

interface KeyFeature {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface PricingPlan {
  name: string;
  price1Month: string;
  price6Month: string;
  price12Month: string;
  features: string[];
  isPopular: boolean;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface ClientReview {
  authorName: string;
  authorRole: string;
  authorImage: string;
  quote: string;
  rating: number;
  companyUrl?: string;
}

interface SaaSProductData {
  id: number;
  title: string;
  slug: string;
  tagline?: string | null;
  shortDescription: string;
  longDescription?: string | null;
  mainImage?: string | null;
  bannerImage?: string | null;
  features?: string | null;
  techStack?: string | null;
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  documentationUrl?: string | null;
  rating?: number | null;
  totalUsers?: string | null;
  keyFeatures?: string | null;
  pricingPlans?: string | null;
  parallaxTitle?: string | null;
  parallaxDescription?: string | null;
  parallaxImage?: string | null;
  demoVideoUrl?: string | null;
  featureCards?: string | null;
  clientReviews?: string | null;
  requestDemoText?: string | null;
  requestDemoUrl?: string | null;
  order: number;
  isActive: boolean;
}

export default function EditForm({ item }: { item: SaaSProductData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: item.title || '',
    slug: item.slug || '',
    tagline: item.tagline || '',
    shortDescription: item.shortDescription || '',
    longDescription: item.longDescription || '',
    mainImage: item.mainImage || '',
    bannerImage: item.bannerImage || '',
    features: item.features || '',
    techStack: item.techStack || '',
    liveDemoUrl: item.liveDemoUrl || '',
    githubUrl: item.githubUrl || '',
    documentationUrl: item.documentationUrl || '',
    rating: item.rating || 0,
    totalUsers: item.totalUsers || '',
    parallaxTitle: item.parallaxTitle || '',
    parallaxDescription: item.parallaxDescription || '',
    parallaxImage: item.parallaxImage || '',
    demoVideoUrl: item.demoVideoUrl || '',
    requestDemoText: item.requestDemoText || 'Request For Demo',
    requestDemoUrl: item.requestDemoUrl || '/contact',
    order: item.order || 0,
    isActive: item.isActive ?? true,
  });

  const [keyFeatures, setKeyFeatures] = useState<KeyFeature[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);

  useEffect(() => {
    try {
      if (item.keyFeatures) setKeyFeatures(JSON.parse(item.keyFeatures));
      if (item.pricingPlans) setPricingPlans(JSON.parse(item.pricingPlans));
      if (item.featureCards) setFeatureCards(JSON.parse(item.featureCards));
      if (item.clientReviews) setClientReviews(JSON.parse(item.clientReviews));
    } catch (e) {
      console.error('Error parsing JSON fields:', e);
    }
  }, [item]);

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        keyFeatures: JSON.stringify(keyFeatures),
        pricingPlans: JSON.stringify(pricingPlans),
        featureCards: JSON.stringify(featureCards),
        clientReviews: JSON.stringify(clientReviews),
      };

      const res = await fetch(`/api/admin/saas-products/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      router.push('/admin/saas-products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addKeyFeature = () => {
    setKeyFeatures([...keyFeatures, { icon: 'fa-star', title: '', description: '', buttonText: '', buttonUrl: '' }]);
  };

  const updateKeyFeature = (index: number, field: keyof KeyFeature, value: string) => {
    const updated = [...keyFeatures];
    updated[index] = { ...updated[index], [field]: value };
    setKeyFeatures(updated);
  };

  const removeKeyFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const addPricingPlan = () => {
    setPricingPlans([...pricingPlans, { name: '', price1Month: '', price6Month: '', price12Month: '', features: [], isPopular: false }]);
  };

  const updatePricingPlan = (index: number, field: keyof PricingPlan, value: string | boolean | string[]) => {
    const updated = [...pricingPlans];
    updated[index] = { ...updated[index], [field]: value };
    setPricingPlans(updated);
  };

  const removePricingPlan = (index: number) => {
    setPricingPlans(pricingPlans.filter((_, i) => i !== index));
  };

  const addFeatureCard = () => {
    setFeatureCards([...featureCards, { icon: 'fa-check', title: '', description: '' }]);
  };

  const updateFeatureCard = (index: number, field: keyof FeatureCard, value: string) => {
    const updated = [...featureCards];
    updated[index] = { ...updated[index], [field]: value };
    setFeatureCards(updated);
  };

  const removeFeatureCard = (index: number) => {
    setFeatureCards(featureCards.filter((_, i) => i !== index));
  };

  const addClientReview = () => {
    setClientReviews([...clientReviews, { authorName: '', authorRole: '', authorImage: '', quote: '', rating: 5, companyUrl: '' }]);
  };

  const updateClientReview = (index: number, field: keyof ClientReview, value: string | number) => {
    const updated = [...clientReviews];
    updated[index] = { ...updated[index], [field]: value };
    setClientReviews(updated);
  };

  const removeClientReview = (index: number) => {
    setClientReviews(clientReviews.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit SaaS Product</h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Basic Information</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Title <span style={{ color: '#dc3545' }}>*</span></label>
            <input type="text" className="admin-form-input" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Slug (URL) <span style={{ color: '#dc3545' }}>*</span></label>
            <input type="text" className="admin-form-input" value={formData.slug} onChange={(e) => handleChange('slug', e.target.value)} required placeholder="my-saas-product" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Tagline</label>
            <input type="text" className="admin-form-input" value={formData.tagline} onChange={(e) => handleChange('tagline', e.target.value)} placeholder="A short catchy phrase" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Short Description <span style={{ color: '#dc3545' }}>*</span></label>
            <textarea className="admin-form-textarea" value={formData.shortDescription} onChange={(e) => handleChange('shortDescription', e.target.value)} required />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Long Description</label>
            <textarea className="admin-form-textarea" value={formData.longDescription} onChange={(e) => handleChange('longDescription', e.target.value)} rows={5} />
          </div>
        </div>

        {/* Images */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Images</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Main Image</label>
            <ImageUpload value={formData.mainImage} onChange={(url) => handleChange('mainImage', url)} folder="maxtech/saas-products" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Banner Image</label>
            <ImageUpload value={formData.bannerImage} onChange={(url) => handleChange('bannerImage', url)} folder="maxtech/saas-products" />
          </div>
        </div>

        {/* Rating & Stats */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Rating & Stats</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Rating (0-5)</label>
              <input type="number" className="admin-form-input" value={formData.rating} onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)} min="0" max="5" step="0.1" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Total Users</label>
              <input type="text" className="admin-form-input" value={formData.totalUsers} onChange={(e) => handleChange('totalUsers', e.target.value)} placeholder="10,000+" />
            </div>
          </div>
        </div>

        {/* Key Features with Icons */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Key Features (Card Style with Icons)</h3>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>Add features that will display as numbered cards with icons</p>
          
          {keyFeatures.map((feature, index) => (
            <div key={index} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#333' }}>Feature {String(index + 1).padStart(2, '0')}</strong>
                <button type="button" onClick={() => removeKeyFeature(index)} className="admin-btn admin-btn-danger admin-btn-sm">Remove</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="text" className="admin-form-input" placeholder="Icon (fa-home)" value={feature.icon} onChange={(e) => updateKeyFeature(index, 'icon', e.target.value)} />
                <input type="text" className="admin-form-input" placeholder="Title" value={feature.title} onChange={(e) => updateKeyFeature(index, 'title', e.target.value)} />
              </div>
              <textarea className="admin-form-textarea" placeholder="Description" value={feature.description} onChange={(e) => updateKeyFeature(index, 'description', e.target.value)} rows={2} style={{ marginBottom: '0.5rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input type="text" className="admin-form-input" placeholder="Button Text (optional)" value={feature.buttonText || ''} onChange={(e) => updateKeyFeature(index, 'buttonText', e.target.value)} />
                <input type="text" className="admin-form-input" placeholder="Button URL (optional)" value={feature.buttonUrl || ''} onChange={(e) => updateKeyFeature(index, 'buttonUrl', e.target.value)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={addKeyFeature} className="admin-btn admin-btn-secondary">+ Add Key Feature</button>
        </div>

        {/* Pricing Plans (Table with 1/6/12 Month Columns) */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Pricing Plans (1/6/12 Month)</h3>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>Define pricing tiers with different durations shown in a comparison table</p>
          
          {pricingPlans.map((plan, index) => (
            <div key={index} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#333' }}>Plan {index + 1}</strong>
                <button type="button" onClick={() => removePricingPlan(index)} className="admin-btn admin-btn-danger admin-btn-sm">Remove</button>
              </div>
              <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="admin-form-label" style={{ fontSize: '0.85rem' }}>Plan Name</label>
                <input type="text" className="admin-form-input" placeholder="e.g. Basic, Pro, Enterprise" value={plan.name} onChange={(e) => updatePricingPlan(index, 'name', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6c757d' }}>1 Month Price</label>
                  <input type="text" className="admin-form-input" placeholder="$99" value={plan.price1Month} onChange={(e) => updatePricingPlan(index, 'price1Month', e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6c757d' }}>6 Month Price</label>
                  <input type="text" className="admin-form-input" placeholder="$499" value={plan.price6Month} onChange={(e) => updatePricingPlan(index, 'price6Month', e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#6c757d' }}>12 Month Price</label>
                  <input type="text" className="admin-form-input" placeholder="$899" value={plan.price12Month} onChange={(e) => updatePricingPlan(index, 'price12Month', e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group" style={{ marginBottom: '0.5rem' }}>
                <label className="admin-form-label" style={{ fontSize: '0.85rem' }}>Features Included (one per line)</label>
                <textarea className="admin-form-textarea" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" value={plan.features.join('\n')} onChange={(e) => updatePricingPlan(index, 'features', e.target.value.split('\n'))} rows={3} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
                <input type="checkbox" checked={plan.isPopular} onChange={(e) => updatePricingPlan(index, 'isPopular', e.target.checked)} />
                Mark as Popular (highlighted in table)
              </label>
            </div>
          ))}
          <button type="button" onClick={addPricingPlan} className="admin-btn admin-btn-secondary">+ Add Pricing Plan</button>
        </div>

        {/* Parallax Section */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Parallax Video Section</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Parallax Title</label>
            <input type="text" className="admin-form-input" value={formData.parallaxTitle} onChange={(e) => handleChange('parallaxTitle', e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Parallax Description</label>
            <textarea className="admin-form-textarea" value={formData.parallaxDescription} onChange={(e) => handleChange('parallaxDescription', e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Parallax Background Image</label>
            <ImageUpload value={formData.parallaxImage} onChange={(url) => handleChange('parallaxImage', url)} folder="maxtech/saas-products" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Demo Video</label>
            <VideoUpload 
              value={formData.demoVideoUrl} 
              onChange={(url) => handleChange('demoVideoUrl', url)} 
              folder="maxtech/saas-products/videos"
              maxSizeMB={20}
            />
          </div>
        </div>

        {/* Feature Detail Cards */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Feature Detail Cards</h3>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>Additional feature cards displayed below the parallax section</p>
          
          {featureCards.map((card, index) => (
            <div key={index} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#333' }}>Card {index + 1}</strong>
                <button type="button" onClick={() => removeFeatureCard(index)} className="admin-btn admin-btn-danger admin-btn-sm">Remove</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="text" className="admin-form-input" placeholder="Icon (fa-cog)" value={card.icon} onChange={(e) => updateFeatureCard(index, 'icon', e.target.value)} />
                <input type="text" className="admin-form-input" placeholder="Title" value={card.title} onChange={(e) => updateFeatureCard(index, 'title', e.target.value)} />
              </div>
              <textarea className="admin-form-textarea" placeholder="Description" value={card.description} onChange={(e) => updateFeatureCard(index, 'description', e.target.value)} rows={2} />
            </div>
          ))}
          <button type="button" onClick={addFeatureCard} className="admin-btn admin-btn-secondary">+ Add Feature Card</button>
        </div>

        {/* Request Demo Section */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Request Demo Section</h3>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>Configure the call-to-action button at the bottom of the product page</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Button Text</label>
              <input type="text" className="admin-form-input" value={formData.requestDemoText} onChange={(e) => handleChange('requestDemoText', e.target.value)} placeholder="Request For Demo" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Button URL</label>
              <input type="text" className="admin-form-input" value={formData.requestDemoUrl} onChange={(e) => handleChange('requestDemoUrl', e.target.value)} placeholder="/contact" />
            </div>
          </div>
        </div>

        {/* Client Reviews */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Client Reviews (Sliding Carousel)</h3>
          
          {clientReviews.map((review, index) => (
            <div key={index} style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#333' }}>Review {index + 1}</strong>
                <button type="button" onClick={() => removeClientReview(index)} className="admin-btn admin-btn-danger admin-btn-sm">Remove</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="text" className="admin-form-input" placeholder="Author Name" value={review.authorName} onChange={(e) => updateClientReview(index, 'authorName', e.target.value)} />
                <input type="text" className="admin-form-input" placeholder="Author Role" value={review.authorRole} onChange={(e) => updateClientReview(index, 'authorRole', e.target.value)} />
              </div>
              <div className="admin-form-group" style={{ marginBottom: '0.5rem' }}>
                <label className="admin-form-label" style={{ fontSize: '0.85rem' }}>Author Image</label>
                <ImageUpload value={review.authorImage} onChange={(url) => updateClientReview(index, 'authorImage', url)} folder="maxtech/testimonials" />
              </div>
              <textarea className="admin-form-textarea" placeholder="Quote/Review" value={review.quote} onChange={(e) => updateClientReview(index, 'quote', e.target.value)} rows={2} style={{ marginBottom: '0.5rem' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#6c757d' }}>Rating</label>
                  <select className="admin-form-input" value={review.rating} onChange={(e) => updateClientReview(index, 'rating', parseInt(e.target.value))}>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <input type="url" className="admin-form-input" placeholder="Company URL (optional)" value={review.companyUrl || ''} onChange={(e) => updateClientReview(index, 'companyUrl', e.target.value)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={addClientReview} className="admin-btn admin-btn-secondary">+ Add Client Review</button>
        </div>

        {/* URLs and Technical */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>URLs & Technical</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Features (separate with |)</label>
            <textarea className="admin-form-textarea" value={formData.features} onChange={(e) => handleChange('features', e.target.value)} placeholder="Feature 1|Feature 2|Feature 3" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Tech Stack (comma separated)</label>
            <input type="text" className="admin-form-input" value={formData.techStack} onChange={(e) => handleChange('techStack', e.target.value)} placeholder="React, Node.js, PostgreSQL" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Live Demo URL</label>
            <input type="url" className="admin-form-input" value={formData.liveDemoUrl} onChange={(e) => handleChange('liveDemoUrl', e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">GitHub URL</label>
            <input type="url" className="admin-form-input" value={formData.githubUrl} onChange={(e) => handleChange('githubUrl', e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Documentation URL</label>
            <input type="url" className="admin-form-input" value={formData.documentationUrl} onChange={(e) => handleChange('documentationUrl', e.target.value)} />
          </div>
        </div>

        {/* Settings */}
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Settings</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Order</label>
            <input type="number" className="admin-form-input" value={formData.order} onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)} />
          </div>

          <label className="admin-form-checkbox">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => handleChange('isActive', e.target.checked)} />
            Active
          </label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Update'}
          </button>
          <Link href="/admin/saas-products" className="admin-btn admin-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
