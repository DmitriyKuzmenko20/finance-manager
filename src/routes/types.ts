import React from 'react';
import { ROUTES } from './constant';

export type RouteItem = {
	path: RouteValue;
	element: React.ReactNode;
};

type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
