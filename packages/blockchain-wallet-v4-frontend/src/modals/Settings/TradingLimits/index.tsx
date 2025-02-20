import React, { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, compose, Dispatch } from 'redux'

import { Text } from 'blockchain-info-components'
import Flyout, { duration, FlyoutChild } from 'components/Flyout'
import { actions } from 'data'
import { RootState } from 'data/rootReducer'
import { ModalName } from 'data/types'
import ModalEnhancer from 'providers/ModalEnhancer'

import { ModalPropsType } from '../../types'
import getData from './selectors'
import Loading from './template.loading'
import Success from './template.success'

export type OwnProps = {
  handleClose: () => void
} & ModalPropsType

class TradingLimits extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { show: false }
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ show: true })
    // fetch user details to obtain most recent state
    this.props.profileActions.fetchUserDataLoading()
    this.props.profileActions.fetchUser()
    this.props.fetchLimitsAndDetails()
    this.props.custodialActions.fetchProductEligibilityForUser()
  }

  handleClose = () => {
    this.setState({ show: false })
    setTimeout(() => {
      this.props.close()
    }, duration)
  }

  render() {
    return (
      <Flyout
        {...this.props}
        onClose={this.handleClose}
        isOpen={this.state.show}
        data-e2e='tradingLimitsModal'
      >
        <FlyoutChild>
          {this.props.data.cata({
            Failure: (error) => (
              <Text color='red600' size='14px' weight={400}>
                {error}
              </Text>
            ),
            Loading: () => <Loading />,
            NotAsked: () => <Loading />,
            Success: (val) => <Success {...val} {...this.props} handleClose={this.handleClose} />
          })}
        </FlyoutChild>
      </Flyout>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  analyticsActions: bindActionCreators(actions.analytics, dispatch),
  custodialActions: bindActionCreators(actions.custodial, dispatch),
  fetchLimitsAndDetails: () => dispatch(actions.components.settings.fetchLimitsAndDetails()),
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  ),
  modalActions: bindActionCreators(actions.modals, dispatch),
  profileActions: bindActionCreators(actions.modules.profile, dispatch)
})

const mapStateToProps = (state: RootState) => ({
  data: getData(state)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(
  ModalEnhancer(ModalName.TRADING_LIMITS_MODAL, { fixed: true, transition: duration }),
  connector
)

export type SuccessStateType = ReturnType<typeof getData>['data']

export type Props = OwnProps & ConnectedProps<typeof connector>
type State = { show: boolean }

export default enhance(TradingLimits)
