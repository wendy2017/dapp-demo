import { CardList } from '@/components/CardList'
import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/site'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Center,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { EXAMPLE_ITEMS } from './examples/examples'

const advancedDemoList = [
  {
    title: 'Staking Reward',
    url: '/examples/stake-reward',
  },
  {
    title: 'NFT Staking',
    url: '/examples/nft-stake',
  },
  {
    title: 'uniswap V3 SDK Demo',
    url: '/examples/uniswap-v3-sdk',
  },
]

export default function Home() {
  return (
    <>
      <div className='mt-4'>
        <h3 className='text-lg mb-2'>Examples</h3>
        {/* <CardList items={EXAMPLE_ITEMS} /> */}
        <Menu>
          <MenuButton as={Button}>Basic Demo</MenuButton>
          <MenuList>
            <Link href='/examples/add-number'>
              <MenuItem>Add Num</MenuItem>
            </Link>
            <Link href='/examples/todo'>
              <MenuItem>TODO</MenuItem>
            </Link>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button}>Medium Demo</MenuButton>
          <MenuList>
            {advancedDemoList.map((mediumDemoItem) => (
              <Link href={mediumDemoItem.url}>
                <MenuItem>{mediumDemoItem.title}</MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </div>
    </>
  )
}
