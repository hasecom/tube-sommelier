import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {TabData} from '@/components/userPageComponents/userPageType';

interface TabComponentProps {
  tabsData:TabData[]
}
const TabComponent:React.FC<TabComponentProps> = ({ tabsData }) => {
  return (
    <>
      <Tabs isFitted>
        <TabList mb='1em'>
          {tabsData.map((tab, index) => (
            <Tab key={index} className="bg-white" _selected={{ color: 'white', bg: 'red.500' }}>
              {tab.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsData.map((tab, index) => (
            <TabPanel key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default TabComponent;
