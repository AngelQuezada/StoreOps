import React from 'react';
import data from '../SupportingData/purchases.json';

const CurrentPurchases = () => {
    // Get the Current Month data
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Let's Filter purchases
    const purchasesThisMonths = data.purchases.filter(purchases => {
        const purchaseDate = new Date(purchases.date);
        return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    // Lets Calculate the total Amount for the current Month

    const totalAmount = purchasesThisMonths.reduce((total, purchase) => {
        return total + purchase.amount;
    }, 0);

    // Let's format the commas for the total amount

    const formattedTotal = totalAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});


    console.log("purchases:", formattedTotal);
    return (
        <div>
            <h2>
                {formattedTotal} 
            </h2>
        </div>
    );
};

export default CurrentPurchases;