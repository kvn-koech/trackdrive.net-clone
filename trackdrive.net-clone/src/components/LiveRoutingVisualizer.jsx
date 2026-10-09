import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, Cpu, Building2, UserCircle } from 'lucide-react';

export default function LiveRoutingVisualizer() {
  const [calls, setCalls] = useState([]);
  
  useEffect(() => {
    let idCounter = 0;
    const interval = setInterval(() => {
      const id = idCounter++;
      const source = Math.floor(Math.random() * 3);
      const target = Math.floor(Math.random() * 3);
      const bid = (Math.random() * 30 + 10).toFixed(2);
      
      const newCall = { id, source, target, bid, stage: 'incoming' };
      setCalls(prev => [...prev.slice(-4), newCall]);
      
      setTimeout(() => {
        setCalls(prev => prev.map(c => c.id === id ? { ...c, stage: 'processing' } : c));
      }, 600);
      
      setTimeout(() => {
        setCalls(prev => prev.map(c => c.id === id ? { ...c, stage: 'routing' } : c));
      }, 1400);

      setTimeout(() => {
        setCalls(prev => prev.map(c => c.id === id ? { ...c, stage: 'completed' } : c));
      }, 2200);

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sources = ['Affiliate A', 'Search Ads', 'Organic'];
  const buyers = ['Call Center X', 'Agency Y', 'Direct Buyer Z'];

  return (
    <div className="live-routing-viz">
      <div className="viz-col sources-col">
        {sources.map((src, i) => (
          <div key={src} className="viz-node source-node">
            <UserCircle size={20} className="node-icon" />
            <span>{src}</span>
            <AnimatePresence>
              {calls.filter(c => c.source === i && c.stage === 'incoming').map(call => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, scale: 0, x: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 100 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="call-packet"
                >
                  <PhoneCall size={14} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="viz-col engine-col">
        <div className="viz-node engine-node">
          <Cpu size={32} className="engine-icon" />
          <div className="engine-glow" />
          <span>Avortyx AI Engine</span>
          <AnimatePresence>
            {calls.filter(c => c.stage === 'processing').map(call => (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 0 }}
                className="processing-ring"
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="viz-col buyers-col">
        {buyers.map((buyer, i) => (
          <div key={buyer} className="viz-node buyer-node">
            <Building2 size={20} className="node-icon" />
            <span>{buyer}</span>
            <AnimatePresence>
              {calls.filter(c => c.target === i && c.stage === 'routing').map(call => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="call-packet buyer-packet"
                >
                  <span className="bid-badge">${call.bid}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
