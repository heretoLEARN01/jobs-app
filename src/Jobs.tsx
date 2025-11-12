import React, { useEffect } from 'react';
import { useGarageStore } from 'hostApp/store';
import { eventBus } from 'hostApp/eventBus';

export default function Jobs() {
  const { selectedCustomer, addJob, jobs } = useGarageStore();

  useEffect(() => {
    eventBus.on('customer-selected', (customer:any) => {
      alert(`Customer selected: ${customer.name}`);
    });
  }, []);

  const createJob = () => {
    const jobName = `Job ${jobs.length + 1} for ${selectedCustomer || 'N/A'}`;
    addJob(jobName);
    eventBus.emit('job-created', jobName);
  };

  return (
    <div style={{ border: '1px solid gray', marginTop: 10, padding: 10 }}>
      <h3>🔧 Jobs Module</h3>
      <button onClick={createJob}>Create Job</button>
      <ul>{jobs.map((job: any, i:any) => <li key={i}>{job}</li>)}</ul>
    </div>
  );
}
