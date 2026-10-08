import React, {lazy, Suspense} from 'react';
import {SEO_ROUTE_PATHS} from './data/seoRoutePaths';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
const Home=lazy(()=>import('./studio/Home').then(m=>({default:m.Home})));
const Shop=lazy(()=>import('./studio/Shop').then(m=>({default:m.Shop})));
const page=(key:string)=>lazy(()=>import('./studio/Pages').then(m=>({default:(m as any)[key]})));
const About=page('About'),Contact=page('Contact'),Blog=page('Blog'),BlogPost=page('BlogPostPage'),Faq=page('Faq');
const Free=lazy(()=>import('./pages/FreeTarotPage').then(m=>({default:m.FreeTarotPage})));
const Seo=lazy(()=>import('./pages/SeoPage').then(m=>({default:m.SeoPage})));
const Layout=lazy(()=>import('./studio/Layout').then(m=>({default:m.Layout})));
export default function App(){return <BrowserRouter><Suspense fallback={null}><Routes>
<Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/readings" element={<Navigate to="/shop" replace/>}/>
<Route path="/about" element={<About/>}/><Route path="/faq" element={<Faq/>}/><Route path="/contact" element={<Contact/>}/>
<Route path="/blog" element={<Blog/>}/><Route path="/blog/:slug" element={<BlogPost/>}/>
<Route path="/free-tarot" element={<Layout seo={false}><Free/></Layout>}/>
{SEO_ROUTE_PATHS.map(path=><Route key={path} path={path} element={<Layout seo={false}><Seo etsyBaseUrl="https://www.etsy.com/shop/PsychicEra"/></Layout>}/>)}
<Route path="*" element={<Home/>}/>
</Routes></Suspense></BrowserRouter>}
