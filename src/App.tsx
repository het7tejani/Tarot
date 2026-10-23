import React, {lazy, Suspense} from 'react';
import {SEO_ROUTE_PATHS} from './data/seoRoutePaths';
import {Routes, Route, Navigate} from 'react-router-dom';
const Admin=lazy(()=>import('./admin/Admin'));
const Home=lazy(()=>import('./studio/Home').then(m=>({default:m.Home})));
const Shop=lazy(()=>import('./studio/Shop').then(m=>({default:m.Shop})));
const page=(key:string)=>lazy(()=>import('./studio/Pages').then(m=>({default:(m as any)[key]})));
const ReadingDetail=lazy(()=>import('./studio/ReadingDetail').then(m=>({default:m.ReadingDetail})));
const About=page('About'),Contact=page('Contact'),Blog=page('Blog'),BlogPost=page('BlogPostPage'),Faq=page('Faq');
const Free=lazy(()=>import('./pages/FreeTarotPage').then(m=>({default:m.FreeTarotPage})));
const NotFound=page('NotFound');
const PrivacyPolicy=lazy(()=>import('./studio/Legal').then(m=>({default:m.PrivacyPolicy})));
const Terms=lazy(()=>import('./studio/Legal').then(m=>({default:m.Terms})));
const CookiePolicy=lazy(()=>import('./studio/Legal').then(m=>({default:m.CookiePolicy})));
const RefundPolicy=lazy(()=>import('./studio/Legal').then(m=>({default:m.RefundPolicy})));
const Seo=lazy(()=>import('./pages/SeoPage').then(m=>({default:m.SeoPage})));
const Layout=lazy(()=>import('./studio/Layout').then(m=>({default:m.Layout})));
export default function App(){return <Suspense fallback={null}><Routes>
<Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/readings" element={<Navigate to="/shop" replace/>}/>
<Route path="/readings/:slug" element={<ReadingDetail/>}/><Route path="/about" element={<About/>}/><Route path="/faq" element={<Faq/>}/><Route path="/contact" element={<Contact/>}/>
<Route path="/admin" element={<Admin/>}/><Route path="/blog" element={<Blog/>}/><Route path="/blog/:slug" element={<BlogPost/>}/>
<Route path="/free-tarot" element={<Layout seo={false}><Free/></Layout>}/>
{SEO_ROUTE_PATHS.map(path=><Route key={path} path={path} element={<Layout seo={false}><Seo/></Layout>}/>)}
<Route path="/privacy-policy" element={<PrivacyPolicy/>}/><Route path="/terms" element={<Terms/>}/><Route path="/cookie-policy" element={<CookiePolicy/>}/><Route path="/refund-policy" element={<RefundPolicy/>}/>
<Route path="*" element={<NotFound/>}/>
</Routes></Suspense>}
