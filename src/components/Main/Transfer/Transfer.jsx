import React, { useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import styles from './Transfer.module.css';
import { DatetimeLocal, Input, Select } from '../../common/FormsControl/FormControls';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader';
import { getBankAccounts } from '../../../actions/bankAccounts'

const Transfer = (props) => {
    const [currentAcc, setAcc] = useState(1)
    
    const onSubmit = (formData) => {
        console.log(formData)
    }
    
    const dispatch = useDispatch() 
    useEffect(() => {
        dispatch(getBankAccounts())
    }, [])
    if (props.accountsFetching) return <Preloader />  
    return ( 
        <div className={styles.transferPage}>
            <form className={styles.transferForm} onSubmit={props.handleSubmit(onSubmit)}>
                <div className={styles.transferInput}>
                    <p>Дата</p>
                    <Field 
                    component={DatetimeLocal}   
                    name={"date"} 
                    />
                </div>
                <div className={styles.transferInput}>
                    <p>Сумма перевода</p>
                    <Field 
                        component={Input}
                        name={"amount"} 
                        validate={[required]} 
                    />
                </div>
                <div className={styles.transferInput}>
                    <p>Со счета</p>
                    <Field 
                        component={Select} 
                        name="fromAccount" 
                        onChange={(e) => setAcc(+e.target.value)}
                        validate={[required]} 
                    >
                        {props.bankAccounts.map(item => <option value={item.id}>{item.name}</option>)}
                    </Field>
                </div>
                <div className={styles.transferInput}>
                    <p>На счет</p>
                    <Field 
                        component={Select} 
                        name='toTheAccount' 
                        validate={[required]}
                    >
                        { props.bankAccounts
                            .filter(item => item.id !== currentAcc)
                            .map(item => <option value={item.id}>{item.name}</option>)
                        }
                    </Field>
                </div>
                <div className={styles.transferInput}>
                    <p>Комментарий</p>
                    <Field 
                        component={Input}
                        name={'comment'} 
                        validate={[maxLengthCreator(30)]} 
                    />
                </div>
                <div className={styles.transferButton}>
                    <button>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

const mstp = (state) => ({
    bankAccounts: state.bankAccountsReducer.bankAccounts,
    accountsFetching: state.bankAccountsReducer.accountsFetching, 
})

export default compose(
    connect(mstp, { getBankAccounts }),
    reduxForm({ form: 'transfer' })
)(Transfer)