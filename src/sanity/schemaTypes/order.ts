

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        { name :'fristName', 
            title: 'First Name',
            type: 'string',
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        },
        {
            name :'address',
            title: 'Address',
            type: 'string',
        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
        },
     {
            name: 'zipCode',
            title: 'Zip',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
        },
        {
            name: 'cartItems',
            title: 'Cart Items',
            type: 'array',
            of: [{type: 'reference', to: { type: 'product'} }]
        },
        { 
            name: 'total',
            title: 'Total',
            type: 'number',
        },
        {
            name: 'paymentIntent',
            title: 'Payment Intent',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'number',
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
        },
        {
            name:'status',
            title: 'Order Status',
            type:'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Success', value: 'Success' },
                    { title: 'Cancelled', value: 'cancelled'},
                    { title: 'Delivered', value: 'delivered' },
                ],
                layout : 'radio',
            },
            initialValue : 'pending',

    }


    ]

}