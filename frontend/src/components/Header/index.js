import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Link from 'next/link';
import {
  Logo,
  HeaderSection,
  Nav,
  LeftNav,
  RightNav,
  StyledLink,
  LeftInnerNav,
  Button,
  ItemNumber
} from './css';

import { selectAuthUser } from '../../selectors/auth';
import { startLogout } from '../../actions/auth';

import Icon from '../Icon';
import { CartLink } from '../../assets/icons';

import { selectCartItems } from '../../selectors/cart';
/* eslint-disable */

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = !!useSelector(selectAuthUser);
  const cartItems = useSelector(selectCartItems);
  return (
    <HeaderSection id="header">
      <Nav>
        <LeftNav>
          <Logo>
            <Link href="/" as="/" passHref>
              <a>FSG</a>
            </Link>
            <span className="screen-reader-only">
              Welcome to Full Stack Gamers
            </span>
          </Logo>

          <LeftInnerNav>
            <li>
              <Link href="/" as="/" passHref>
                <StyledLink>Home</StyledLink>
              </Link>
            </li>
          </LeftInnerNav>
        </LeftNav>

        <RightNav>
          <li>
            <Link href="/cart" as="/cart" passHref>
              <StyledLink>
                <span className="screen-reader-only">
                  Link to Cart Page. Cart currently has {cartItems.length}
                  items.
                </span>
                <ItemNumber numItems={cartItems.length} />
                <Icon>
                  <CartLink />
                </Icon>
              </StyledLink>
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link href="/login" as="/login" passHref>
                  <StyledLink>Login</StyledLink>
                </Link>
              </li>
              <li>
                <Link href="/signup" as="/signup" passHref>
                  <a>Signup</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profile" as="/profile" passHref>
                  <StyledLink>Profile</StyledLink>
                </Link>
              </li>
              <li role="none">
                <Button type="button" onClick={() => dispatch(startLogout())}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </RightNav>
      </Nav>
    </HeaderSection>
  );
};

export default Header;
