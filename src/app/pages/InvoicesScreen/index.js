import React, { useState } from 'react';

export default function InvoicesScreen() {
  const [creditCardHash, setHash] = useState('');

  var cardData = {
    cardNumber: '5447318579847704',
    holderName: 'Tereza Santos Farias',
    securityCode: '675',
    expirationMonth: '07',
    expirationYear: '2028'
  };

  return (
    <div>
      <h1>InvoicesScreen</h1>

      <button
        type="button"
        className="btn btn-primary btn-fw"
        onClick={async () => {
          const PUBLIC_TOKEN = '84EFB588CFAD58116FC279590C81BD0C545F336110FB1023431C4E505AD10D83';

          const checkout = new window.DirectCheckout(PUBLIC_TOKEN, false);

          await checkout.getCardHash(cardData, cardHash => {
            console.log('------------ DEU CERTO ------------');
            console.log(cardHash);
            setHash(cardHash);
          }, error => {
            console.log('------------ DEU ERRO ------------');
            console.log(error);
          });
        }}
      >Assinar</button>

    </div>
  );
}