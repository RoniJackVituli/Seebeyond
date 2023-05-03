import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { Accessibility } from 'accessibility';
import { labels, modules } from './utils/options';

window.addEventListener('load', function() {
  new Accessibility({labels:labels, modules:modules, icon:{
    circular:true,
    img:'accessible',
  },
session:{persistent:false} });
}, false);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.Suspense fallback="loading">
    <App />
  </React.Suspense>
);

