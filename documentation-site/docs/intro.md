---
sidebar_position: 1
---

# Introduction

`ethdk` is a Node.js module led by the Wallet Account eXperiments (WAX) team within the Privacy and Scaling Explorations group at the Ethereum Foundation. The primary goal of this package is to enable developers to easily create Ethereum accounts that utilize cutting-edge and experimental features. This documentation provides an overview of the `ethdk` package, its background, and its intended purpose.

## Origins and Evolution

The WAX team (formerly BLS Wallet team) initially developed the BLS wallet, which was designed prior to the mainstream adoption of account abstraction with ERC 4337. With the evolving Ethereum ecosystem, the team is now working on the v2 of BLS wallet, which will be fully ERC-4337 compliant.

ethdk is designed as a streamlined Node.js module that simplifies the process of working with accounts for web3 developers. It is an opinionated module that employs sensible defaults, catering to the needs of the Ethereum community. For instance, in order to take advantage of reduced gas fees from a BLS account, the module assumes you will be using it on an L2.

The package extends its support beyond just BLS accounts, as the Ethereum ecosystem continues to evolve and new features emerge. ethdk aims to highlight and facilitate experimentation with various account types and features, providing developers with a versatile toolkit for creating Ethereum accounts tailored to their requirements.

## Modular Approach and Future Support

In order to cater to the diverse needs of the Ethereum community, the WAX team is focused on building modules for their v2 contracts that enable experimental features for wallets. You can find more details about these modules in the Modules section of the documentation.

As the Ethereum ecosystem continues to grow and develop, `ethdk` aims to stay at the forefront by incorporating future modules and ensuring out-of-the-box support for them. This will make it easier for developers to integrate and experiment with new features as they become available.

## Account Types and Functionality

`ethdk` currently supports three account types:

1. **`bls` - BLS Account**
2. **`aa` - Account Abstraction**
3. **`eoa` - Externally Owned Account**

Each account type comes with its unique features and functionality. For example, the BLS account offers account recovery capabilities. More information about the supported account types and how to create them can be found in the Accounts documentation page.

## Getting Started

To start using `ethdk`, refer to the Networks and Accounts documentation pages for information on how to create accounts and interact with various Ethereum networks. As you explore the package and its capabilities, don't hesitate to refer back to this documentation for guidance and support.

Welcome to the world of `ethdk`, where cutting-edge Ethereum accounts and features are at your fingertips!
