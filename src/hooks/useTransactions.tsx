import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number
    title: string
    value: number
    type: string
    category: string
    createdAt: string
}

interface TransactionInput {
    title: string
    value: number
    type: string
    category: string
}

interface TransactionContextData {
    transactions: Transaction[]
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions , setTransactions] = useState<Transaction[]>([])

    useEffect(() =>{
        api.get('transactions')
            .then( response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transaction: TransactionInput){
        const response = await api.post('/transactions' ,  {
            ...transaction,
            createdAt: new Date()
        })

        setTransactions([ 
            ...transactions,
            response.data.transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions , createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)

    return context
}