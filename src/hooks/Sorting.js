import { useState } from 'react';

export const useSorting = (initialField = 'title') => {
    const [sortConfig, setSortConfig] = useState({
        field: initialField,
        isAsc: true
    });

    const sortItems = (items) => {
        if (!sortConfig.field) {
            // Return items as-is for default sorting
            return items;
        }
        return [...items].sort((a, b) => {
            if (a[sortConfig.field] < b[sortConfig.field]) {
                return sortConfig.isAsc ? -1 : 1;
            }
            if (a[sortConfig.field] > b[sortConfig.field]) {
                return sortConfig.isAsc ? 1 : -1;
            }
            return 0;
        });
    };

    const requestSort = (field) => {
        setSortConfig(prev => ({
            field,
            isAsc: prev.field === field ? !prev.isAsc : true
        }));
    };

    return { sortedItems: sortItems, requestSort, sortConfig };
};