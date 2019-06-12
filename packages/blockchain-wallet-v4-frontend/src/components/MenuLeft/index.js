import styled from 'styled-components'
import { transparentize } from 'polished'
import { Icon } from 'blockchain-info-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
`
export const MenuItem = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  padding: 12px 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border-width: 0px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: background 0.3s;
  background: ${props => props.theme['white']};
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  & > *:not(div) {
    cursor: pointer;
    transition: color 0.3s;
  }
  .icon {
    width: 30px;
    margin-right: 10px;
    color: ${props => props.theme['gray-3']};
  }
  .destination {
    color: ${props => props.theme['grey600']};
  }
  &:hover {
    background: ${props => props.theme['blue000']};
  }
  &.active {
    background: ${props => props.theme['blue100']};
  }
  &:active {
    background: ${props => props.theme['blue200']};
  }
  &:hover,
  &.active {
    .icon {
      color: ${props => props.theme['blue']};
    }
    .destination {
      color: ${props => props.theme['deep-blue']};
    }
  }
  &.coin {
    .coin-icon {
      width: 30px;
      margin-right: 10px;
    }
    &:hover {
      background: ${props =>
        props.colorCode && transparentize(0.85, props.theme[props.colorCode])};
      .destination {
        color: ${props => props.theme['grey600']};
      }
    }
    &.active,
    &:active {
      background: ${props =>
        props.colorCode && transparentize(0.75, props.theme[props.colorCode])};
      .destination {
        color: ${props => props.theme['grey800']};
      }
    }
  }
`
export const MenuIcon = styled(Icon).attrs({ className: 'icon' })``
export const CoinIcon = styled(Icon).attrs({ className: 'coin-icon' })``
export const Destination = styled.span.attrs({ className: 'destination' })``
export const SubMenu = styled.ul`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
  text-transform: none;
  padding: 5px;
  margin-left: 40px;
  margin-top: -15px;
  margin-bottom: 5px;
`
export const SubMenuItem = styled.li`
  padding: 4px 0;
  box-sizing: border-box;
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;

  &.active {
    & > * {
      font-weight: 500;
      color: ${props => props.theme['blue']};
    }
  }

  &:hover {
    & > * {
      color: ${props => props.theme['blue']};
    }
  }
`
export const Separator = styled.div`
  margin-bottom: 8px;
  padding-left: 16px;
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  background-color: ${props => props.theme['gray-1']};
`
