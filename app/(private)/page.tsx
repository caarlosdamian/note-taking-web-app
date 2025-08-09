import { Toast } from '@/src/components/toast';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Toast
        title="Note restored to active notes."
        linkLabel="All Notes"
        linkPath="/login"
      />
    </div>
  );
};

export default HomePage;
