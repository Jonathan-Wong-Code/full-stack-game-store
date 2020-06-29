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
  Button
} from './css';

import { selectAuthUser } from '../../selectors/auth';
import { startLogout } from '../../actions/auth';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = !!useSelector(selectAuthUser);

  return (
    <HeaderSection>
      <Nav>
        <LeftNav>
          <Logo>
            <Link href="/" as="/">
              <a>FSG</a>
            </Link>
            <span className="screen-reader-only">
              Welcome to Full Stack Gamers
            </span>
          </Logo>

          <LeftInnerNav>
            <li>
              <Link href="/store" as="/store">
                <StyledLink>Store</StyledLink>
              </Link>
            </li>
            <li>
              <Link href="/" as="/">
                <StyledLink>Search All</StyledLink>
              </Link>
            </li>
          </LeftInnerNav>
        </LeftNav>

        <RightNav>
          {!isLoggedIn ? (
            <>
              <li>
                <Link href="/login" as="/login">
                  <StyledLink>Login</StyledLink>
                </Link>
              </li>
              <li>
                <Link href="/signup" as="/signup">
                  <a>Signup</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profile" as="/profile">
                  <StyledLink>Profile</StyledLink>
                </Link>
              </li>
              <li>
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
