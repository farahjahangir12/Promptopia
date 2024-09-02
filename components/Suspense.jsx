'use client';

import React, { Suspense } from 'react';

const Suspense = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default Suspense;

