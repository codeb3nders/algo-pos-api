import {useColorScheme} from 'react-native';
import {useEffect, useState} from 'react';
import {moneyFormat} from '../helpers/money-format';
import {useOrderStore} from '../store/order.store';
import {useSalesStore} from '../store/sales.store';

const usePrintVoucher = () => {
  const orderStore = useOrderStore();
  const {sales, discount, setDiscount, vat} = useSalesStore();
  const {orders, voucher, createVoucher} = orderStore;
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text: "[L]<font size='tall'>Customer :</font>\n",
  });

  const prepare = () => {
    console.log('VOUCHER', voucher);
    const allOrders = voucher?.orders;

    if (!allOrders) return;

    let txt = '\n[L]<b>ORDER INVOICE</b>\n';

    Object.keys(allOrders).forEach((order: any) => {
      const {orders} = voucher.orders[order];

      orders.forEach(item => {
        const itm = item ? item.item : '';
        const price = item ? item.price : 0;
        const deduct = item.deduction ? item.deduction.value : 0;
        const opt = item ? item.option : 0;
        const quantity = item ? item.quantity : 0;
        const totalAmount = price * quantity;
        const deduction = deduct > 0 && deduct;

        const discountedAmount = totalAmount - deduct;
        const withDuction = deduction ? `-${deduction}` : '';
        txt += ` ${quantity} ${itm} ${opt}: ${moneyFormat(
          price,
        )} ${withDuction} = ${moneyFormat(discountedAmount)}\n`;
      });
    });

    txt += '[C]-----------------------\n';
    if (discount && discount.value) {
      txt += `[L]Dsicount: ${discount.type}\n`;
    }

    txt += `[L]${voucher.totalQuantity} items, <b>Amount: ${moneyFormat(
      voucher.totalPrice,
    )}</b>\n`;

    setState(() => ({text: txt}));
  };

  useEffect(() => {
    prepare();
  }, [voucher]);

  return state.text;
};

const usePrintOrder = () => {
  const orderStore = useOrderStore();
  const {sales, discount, setDiscount, vat} = useSalesStore();
  const {orders, voucher, createVoucher} = orderStore;
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text: "[L]<font size='tall'>Customer :</font>\n",
  });

  const prepare = () => {
    const allOrders = voucher?.orders;

    if (!allOrders) return;

    let txt = '[L]KITCHEN ORDER\n';

    Object.keys(allOrders).forEach((order: any) => {
      const {orders} = voucher.orders[order];

      orders.forEach(item => {
        const itm = item ? item.item : '';
        const price = item ? item.price : 0;
        const opt = item ? item.option : 0;
        const quantity = item ? item.quantity : 0;
        txt += `${itm} ${opt}: x ${quantity} \n`;
      });
    });

    txt += `=============End==============`;

    setState(() => ({text: txt}));
  };

  useEffect(() => {
    prepare();
  }, [voucher]);

  return state.text;
};

export {usePrintVoucher, usePrintOrder};
