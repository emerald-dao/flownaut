import { config } from '@onflow/fcl';
import dappInfo from '$lib/config/config';

export const network = 'testnet';

const fclConfigInfo = {
	emulator: {
		accessNode: 'http://127.0.0.1:8888',
		discoveryWallet: 'http://localhost:8701/fcl/authn',
		discoveryAuthInclude: []
	},
	testnet: {
		accessNode: 'https://rest-testnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/testnet/authn',
		discoveryAuthnEndpoint: 'https://fcl-discovery.onflow.org/api/testnet/authn'
	},
	mainnet: {
		accessNode: 'https://rest-mainnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/authn',
		discoveryAuthnEndpoint: 'https://fcl-discovery.onflow.org/api/authn'
	}
};

const resolver = async () => {
	const nonce = '7f190deedcd3b0538b7cd0ebc1994ed40d9db16cc1a6fcc3e7a994240c14d86d';
	return {
		appIdentifier: dappInfo.title,
		nonce
	};
};

config()
	.put('app.detail.title', dappInfo.title)
	.put('app.detail.icon', dappInfo.icon)
	.put('fcl.accountProof.resolver', resolver)
	.put('accessNode.api', fclConfigInfo[network].accessNode)
	.put('flow.network', network)
	.put('discovery.wallet', fclConfigInfo[network].discoveryWallet)
	.put('discovery.authn.endpoint', fclConfigInfo[network].discoveryAuthnEndpoint);
