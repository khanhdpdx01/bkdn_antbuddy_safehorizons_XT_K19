import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { addItem } from '../../../store/cart/action';
import { stickyHeader } from '../../../utilities/common-helpers';
import { formatCurrency } from '../../../utilities/product-helper';

class HeaderProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    handleAddItemToCart = (e) => {
        e.preventDefault();
        const { productData } = this.props;
        this.props.dispatch(addItem(productData));
    };

    handleScroll = () => {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (number >= 300) {
            document
                .getElementById('headerSticky')
                .classList.add('header--sticky');
        } else {
            document
                .getElementById('headerSticky')
                .classList.remove('header--sticky');
        }
    };

    render() {
        const { productData } = this.props;
        const { singleProduct } = this.props;
        return (
            <header
                className="header header--1 header--product"
                data-sticky="true"
                id="headerSticky">
                <div className="header__top">
                    <div className="ps-container">
                        <div className="header__left">
                            <Link href="/">
                                <a className="ps-logo">
                                    <img
                                        src="/static/img/logo_light.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Categories</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories data={[]}/>
                                </div>
                            </div>
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
                <nav className="navigation navigation--product">
                    <div className="container">
                        <article className="ps-product--header-sticky">
                            <div className="ps-product__thumbnail">
                                <img
                                    src={singleProduct.thumbnail}
                                    alt="martfury"
                                />
                            </div>
                            <div className="ps-product__wrapper">
                                <div className="ps-product__content">
                                    <Link
                                        href="/product/[pid]"
                                        as={`/product/${singleProduct.product_id}`}>
                                        <a className="ps-product__title">
                                            {singleProduct.product_name}
                                        </a>
                                    </Link>
                                </div>
                                <div className="ps-product__shopping">
                                    {singleProduct.discount ? (
                                        <span className="ps-product__price">
                                            <span>₫{singleProduct.price ? formatCurrency(singleProduct.price*1000): 0}</span>
                                            <del>
                                                ₫{singleProduct.discount ? formatCurrency(singleProduct.price*singleProduct.discount*1000/100): 0}
                                            </del>
                                        </span>
                                    ) : (
                                        <span className="ps-product__price">
                                            <span>${singleProduct.price ? formatCurrency(singleProduct.price*1000): 0}</span>
                                        </span>
                                    )}
                                    <a
                                        className="ps-btn"
                                        href="#"
                                        onClick={(e) =>
                                            this.handleAddItemToCart(e)
                                        }>
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </nav>
            </header>
        );
    }
}
export default connect((state) => state.product)(HeaderProduct);
