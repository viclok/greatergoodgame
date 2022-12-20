import {writable} from 'svelte/store'

export const BankStore = writable([
    {
        id: 1,
        name: "Player 1",
        deposits: [0,0,0,0,0],
        accountTotal: 0,
    },
    {
        id: 2,
        name: "Player 2",
        deposits: [0,0,0,0,0],
        accountTotal: 0,
    },
    {
        id: 3,
        name: "Player 3",
        deposits: [0,0,0,0,0],
        accountTotal: 0,
    },
    {
        id: 4,
        name: "Player 4",
        deposits: [0,0,0,0,0],
        accountTotal: 0,
    },    
    {
        id: 5,
        name: "Player 5",
        deposits: [0,0,0,0,0],
        accountTotal: 0,
    },
])