import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Bot, PhoneCall, Route, Volume2, UserCheck, GripVertical } from 'lucide-react';

const initialBlocks = [
  { id: 'start', icon: PhoneCall, label: 'Inbound Call', type: 'trigger', color: '#3b82f6' },
  { id: 'ivr', icon: Volume2, label: 'Welcome IVR', type: 'action', color: '#8b5cf6' },
  { id: 'ai', icon: Bot, label: 'AI Qualifier', type: 'action', color: '#10b981' },
  { id: 'route', icon: Route, label: 'Ping Buyers', type: 'logic', color: '#f59e0b' },
  { id: 'connect', icon: UserCheck, label: 'Connect to Agent', type: 'end', color: '#14b8a6' },
];

export default function WorkflowBuilder() {
  const [blocks, setBlocks] = useState(initialBlocks);

  return (
    <div className="workflow-builder-container">
      <div className="workflow-sidebar">
        <h3>Building Blocks</h3>
        <p>Drag to reorder your call flow</p>
      </div>
      
      <div className="workflow-canvas">
        <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="block-list">
          {blocks.map((block, index) => (
            <Reorder.Item key={block.id} value={block} className="workflow-block-wrapper">
              <div className="workflow-block" style={{ borderLeftColor: block.color }}>
                <GripVertical className="grip-icon" size={16} />
                <div className="block-icon" style={{ backgroundColor: `${block.color}20`, color: block.color }}>
                  <block.icon size={20} />
                </div>
                <div className="block-content">
                  <span className="block-label">{block.label}</span>
                  <span className="block-type">{block.type}</span>
                </div>
              </div>
              {index < blocks.length - 1 && (
                <div className="block-connector">
                  <div className="connector-line" />
                  <div className="connector-arrow" />
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
