import Modal from "react-modal";
import { Container, TransactionsTypeContainer , RadioBox } from "./styles";
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";


interface NewTransactionModalProps {
    onRequestClose: () => void;
    isOpen: boolean
}

export function NewTransactionModal({ isOpen , onRequestClose} : NewTransactionModalProps){

    const [title , setTitle] = useState('')
    const [value , setValue] = useState(0)
    const [category , setCategory] = useState('')
    const [type , setType] = useState('deposit')

    const { createTransaction } = useTransactions()

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault()

        const data = {
            title,
            value,
            category,
            type
        }

        await createTransaction(data)
        setTitle('')
        setValue(0)
        setCategory('')
        setType('deposit')
        
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <Container>
                <button 
                    onClick={onRequestClose} 
                    className="react-modal-close" 
                >
                    <img src={closeImg} alt="close" />
                </button>

                <h2>Cadastrar transação</h2>

                <input 
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))} 
                />

                <TransactionsTypeContainer>
                    <RadioBox
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span> Entrada </span>
                    </RadioBox>

                    <RadioBox
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="" />
                        <span> Saída </span>
                    </RadioBox>
                </TransactionsTypeContainer>

                

                <input 
                    type="text"
                    placeholder="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button
                    type="submit"
                    className="submit"
                    onClick={handleCreateNewTransaction}
                >
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}