import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
<div className="card-backgorund font-mont font-normal bg-center rounded-lg">

    <div className="">
      <div className="flex navbar-theme overflow-hidden " style={{
        borderRadius: '20px 20px 0px 0px',
      }}>
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'text-12 gradient-button' : ''
            }  flex-1 text-gray-600 text-14 font-mont font-bold py-3 px-1`}
            onClick={e => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4 px-3">
        {children.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};
export { Tabs, Tab };