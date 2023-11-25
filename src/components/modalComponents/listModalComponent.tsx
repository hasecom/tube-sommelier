
import { useState, useEffect,useRef } from 'react';
import {
  Button, useDisclosure, Modal, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Tab, Tabs, TabList, TabPanel, TabPanels
} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { ListItem } from '@/components/userPageComponents/userPageType'
import 'swiper/css';

import UserListCardComponent from '@/components/cardComponents/userListCardComponent';
import { UserListProvider } from '@/providers/userListProvider';
type Props = {
  page:number
  lists:ListItem[],
  userId:string,
  showListModal: boolean,
  setShowListModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ListModalComponent: React.FC<Props> = ({page, lists,userId, showListModal, setShowListModal }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const swiperRefs = useRef<Array<Swiper | null>>([null, null]);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
    if (swiperRefs.current[1]) {
      swiperRefs.current[1]?.slideTo(index);
    }
  };
  const handleSlideChange = (index: number) => {
    setTabIndex(index);
  };
  useEffect(() => {
    if (showListModal) {
      onOpen();
    }
  }, [showListModal]);

  const closeModal = () => {
    setTabIndex(0);
    onClose();
    setShowListModal(false);
  }
  return (
    <>
      <Modal onClose={closeModal} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Tabs index={tabIndex} onChange={(index) => handleTabChange(index)} isLazy>
            <TabList>
              {lists.map((list:ListItem,listIndex:number) => (
                <Tab key={listIndex} >{list.TAB_TITLE}</Tab>
              ))}
            </TabList>
              <TabPanels>
              <Swiper 
              onSwiper={(swiper) => (swiperRefs.current[1] = swiper)}
              spaceBetween={10}
              slidesPerView={1}
              initialSlide={page}
              onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            >
                <TabPanel key={0}>
                  <SwiperSlide key={0}>
                    <ModalBody>
                      <UserListProvider userId={userId} apiEndpoint="api/list/follow" >
                        <UserListCardComponent />
                      </UserListProvider>
                      </ModalBody>
                  </SwiperSlide>
                </TabPanel>
                <TabPanel key={1}>
                  <SwiperSlide key={1}>
                    <ModalBody>
                      <UserListProvider userId={userId} apiEndpoint="api/list/follower" >
                        <UserListCardComponent />
                      </UserListProvider>
                    </ModalBody>
                  </SwiperSlide>
                </TabPanel>
                </Swiper>
              </TabPanels>
          </Tabs>
          <ModalFooter>
            <Button onClick={closeModal}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ListModalComponent;