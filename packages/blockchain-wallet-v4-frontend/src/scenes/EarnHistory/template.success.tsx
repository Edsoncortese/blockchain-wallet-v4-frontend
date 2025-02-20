import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import { flatten, head, last, map } from 'ramda'
import styled from 'styled-components'

import { Exchange, Remote } from '@core'
import {
  HeartbeatLoader,
  Icon,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from 'blockchain-info-components'
import { EarnTransactionType } from 'data/components/interest/types'

import { Props as OwnProps, SuccessStateType } from '.'
import {
  AmountTableCell,
  CoinAmountWrapper,
  ErrorTag,
  FiatAmountWrapper,
  IconBackground,
  InterestTableCell,
  PendingTag,
  Value,
  ViewTransaction
} from './EarnHistory.model'
import Empty from './Empty'
import Loading from './template.loading'

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
`
const Container = styled.div`
  min-width: 900px;
  padding-bottom: 45px;
`

function TransactionList(props: Props): ReactElement | null {
  const { earnActions, txPages, walletCurrency } = props
  const txList = flatten(
    txPages &&
      // @ts-ignore
      txPages.map((pages) => map((page) => page, (pages && pages.data) || []))
  )
  return txList && txList.length > 0 ? (
    <Container style={{ minWidth: '900px', paddingBottom: '45px' }}>
      <Table style={{ minWidth: '900px' }}>
        <TableHeader>
          <TableCell width='20%'>
            <Text size='12px' weight={500}>
              <FormattedMessage id='scenes.interest.history.type' defaultMessage='Type' />
            </Text>
          </TableCell>
          <TableCell width='20%'>
            <Text size='12px' weight={500}>
              <FormattedMessage id='copy.date' defaultMessage='Date' />
            </Text>
          </TableCell>
          <TableCell width='20%'>
            <Text size='12px' weight={500}>
              <FormattedMessage id='copy.from' defaultMessage='From' />
            </Text>
          </TableCell>
          <TableCell width='20%'>
            <Text size='12px' weight={500}>
              <FormattedMessage id='copy.to' defaultMessage='To' />
            </Text>
          </TableCell>
          <AmountTableCell width='20%'>
            <Text size='12px' weight={500}>
              <FormattedMessage id='copy.amount' defaultMessage='Amount' />
            </Text>
          </AmountTableCell>
        </TableHeader>
        {txList.map((tx: EarnTransactionType) => {
          const { amount, extraAttributes, id, insertedAt, product, state, type } = tx
          const displayName = window.coins[amount.symbol].coinfig.name
          const isCustodial = extraAttributes && extraAttributes.transferType === 'INTERNAL'
          return (
            <TableRow key={id}>
              <InterestTableCell width='20%'>
                {type === 'WITHDRAWAL' ? (
                  <>
                    <IconBackground color={amount.symbol}>
                      <Icon name='arrow-up' color='white' size='20px' weight={600} data-e2e={id} />
                    </IconBackground>
                    <Value data-e2e='withdrawalTx'>{amount.symbol} Withdraw</Value>
                    {state === 'REJECTED' || state === 'FAILED' ? (
                      <ErrorTag>
                        <FormattedMessage id='copy.failed' defaultMessage='Failed' />
                      </ErrorTag>
                    ) : state === 'REFUNDED' ? (
                      <PendingTag>
                        <FormattedMessage id='copy.refunded' defaultMessage='Refunded' />
                      </PendingTag>
                    ) : state !== 'COMPLETE' ? (
                      <PendingTag>
                        <FormattedMessage id='copy.pending' defaultMessage='Pending' />
                      </PendingTag>
                    ) : (
                      <></>
                    )}
                  </>
                ) : type === 'DEPOSIT' ? (
                  <>
                    <IconBackground color={amount.symbol}>
                      <Icon name='arrow-down' color='white' size='20px' weight={600} />
                    </IconBackground>

                    <Value data-e2e='depositTx'>{amount.symbol} Deposit</Value>
                    {state === 'REJECTED' || state === 'FAILED' ? (
                      <ErrorTag>
                        <FormattedMessage id='copy.failed' defaultMessage='Failed' />
                      </ErrorTag>
                    ) : state === 'REFUNDED' ? (
                      <PendingTag>
                        <FormattedMessage id='copy.refunded' defaultMessage='Refunded' />
                      </PendingTag>
                    ) : state !== 'COMPLETE' ? (
                      <PendingTag>
                        <FormattedMessage id='copy.pending' defaultMessage='Pending' />
                      </PendingTag>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <Icon name='percentage' color={amount.symbol} size='32px' />
                    <Value data-e2e='interestEarnedTx'>
                      <FormattedMessage
                        id='modals.interest.symbolearned'
                        defaultMessage='{symbol} Earned'
                        values={{ symbol: amount.symbol }}
                      />
                    </Value>
                  </>
                )}
              </InterestTableCell>
              <TableCell width='20%'>
                <Value data-e2e='interestTransactionDate'>
                  {format(new Date(insertedAt), 'MMMM d yyyy @ h:mm a')}
                </Value>
              </TableCell>
              {type === 'DEPOSIT' ? (
                <>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionFrom'>
                      {isCustodial ? (
                        <span>{displayName} Trading Account</span>
                      ) : (
                        <span>{displayName} Private Key Wallet</span>
                      )}
                    </Value>
                  </TableCell>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionTo'>
                      <FormattedMessage
                        id='modals.earn.detailstitle'
                        defaultMessage='{displayName} {product} Account'
                        values={{ displayName, product }}
                      />
                    </Value>
                  </TableCell>
                </>
              ) : type === 'WITHDRAWAL' ? (
                <>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionFrom'>
                      <FormattedMessage
                        id='modals.earn.detailstitle'
                        defaultMessage='{displayName} {product} Account'
                        values={{ displayName, product }}
                      />
                    </Value>
                  </TableCell>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionTo'>
                      {isCustodial ? (
                        <span>{displayName} Trading Account</span>
                      ) : (
                        <span>{displayName} Private Key Wallet</span>
                      )}
                    </Value>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionFrom'>Blockchain.com</Value>
                  </TableCell>
                  <TableCell width='20%'>
                    <Value data-e2e='interestTransactionTo'>
                      <FormattedMessage
                        id='modals.earn.detailstitle'
                        defaultMessage='{displayName} {product} Account'
                        values={{ displayName, product }}
                      />
                    </Value>
                  </TableCell>
                </>
              )}

              <AmountTableCell width='20%'>
                <div>
                  <CoinAmountWrapper
                    coin={amount.symbol}
                    color='grey800'
                    weight={600}
                    data-e2e='interestTxCoinAmount'
                    size='14px'
                    style={{ lineHeight: '1.5', marginBottom: '4px' }}
                  >
                    {Exchange.convertCoinToCoin({
                      baseToStandard: false,
                      coin: amount.symbol,
                      value: amount.value
                    })}
                  </CoinAmountWrapper>
                  <FiatAmountWrapper
                    color='grey600'
                    coin={amount.symbol}
                    currency={walletCurrency}
                    data-e2e='interestTxFiatAmount'
                    size='12px'
                    style={{ alignItems: 'right' }}
                    weight={500}
                  >
                    {Exchange.convertCoinToCoin({
                      baseToStandard: false,
                      coin: amount.symbol,
                      value: amount.value
                    })}
                  </FiatAmountWrapper>
                  {type === 'DEPOSIT' && !isCustodial && (
                    <ViewTransaction
                      data-e2e='viewTxHash'
                      onClick={() =>
                        earnActions.routeToTxHash({
                          coin: amount.symbol,
                          txHash: extraAttributes.hash
                        })
                      }
                    >
                      <FormattedMessage
                        id='copy.viewTransaction'
                        defaultMessage='View Transaction'
                      />
                    </ViewTransaction>
                  )}
                  {type === 'WITHDRAWAL' && state === 'COMPLETE' && !isCustodial && (
                    <ViewTransaction
                      data-e2e='viewTxHash'
                      onClick={() =>
                        earnActions.routeToTxHash({
                          coin: amount.symbol,
                          txHash: extraAttributes.txHash
                        })
                      }
                    >
                      <FormattedMessage
                        id='copy.viewTransaction'
                        defaultMessage='View Transaction'
                      />
                    </ViewTransaction>
                  )}
                </div>
              </AmountTableCell>
            </TableRow>
          )
        })}
      </Table>
      {Remote.Loading.is(last(txPages)) && (
        <LoadingWrapper>
          <HeartbeatLoader />
        </LoadingWrapper>
      )}
    </Container>
  ) : Remote.Loading.is(head(txPages)) ? (
    <Loading />
  ) : (
    <Empty />
  )
}

type Props = OwnProps & SuccessStateType

export default TransactionList
