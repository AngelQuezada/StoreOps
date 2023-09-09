import React from 'react';
import data from '../SupportingData/purchases.json';

const CurrentPurchases = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const purchasesThisMonths = data.purchases.filter(purchases => {
        const purchaseDate = new Date(purchases.date);
        return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    const totalAmount = purchasesThisMonths.reduce((total, purchase) => {
        return total + purchase.amount;
    }, 0);

    const formattedTotal = totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div>
            <h2>
                {formattedTotal} 
            </h2>
        </div>
    );
};

export default CurrentPurchases;
