import { useDispatch, useSelector } from 'react-redux';
import * as UserSlice from 'store/users/shared/slice';
import * as UserSelector from 'store/users/shared/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { TooltipTitle } from 'commom/contants';
import { Box, IconButton, Modal, Skeleton, Switch, Tooltip } from '@mui/material';
import { VisibilityRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { LocalStorageKey, LocalStorageService } from 'services/localStorage';

interface Prop {
  isShowed: boolean;
}
export const Advertising = (prop: Prop) => {
  const banners = useSelector(UserSelector.selectBanner);
  const dispatch = useDispatch();

  const { isShowed } = prop;
  SwiperCore.use([Autoplay]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const offAdd: any = LocalStorageService.getItem(LocalStorageKey.offAdd);
  const [isAdd, setIsAdd] = useState<boolean>(offAdd ? true : false);

  useEffect(() => {
    dispatch(UserSlice.actions.getBannersLoad());
  }, []);

  const handleOpen = (img: string) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      {isShowed && (
        <Box sx={{ width: '100%', textAlign: 'left' }}>
          <Tooltip title={`On/Off`}>
            <Switch
              size="small"
              color="primary"
              checked={isAdd}
              onChange={e => {
                setIsAdd(e.target.checked);
                if (offAdd) {
                  LocalStorageService.removeLocalStorageByKey(LocalStorageKey.offAdd);
                } else {
                  LocalStorageService.setItem({ key: LocalStorageKey.offAdd, value: 'on' });
                }
              }}
            />
          </Tooltip>
        </Box>
      )}
      {offAdd || !isShowed ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={5}
          freeMode={true}
          modules={[Autoplay, FreeMode, Navigation]}
        >
          {banners.length ? (
            banners.map(row => (
              <SwiperSlide key={row.id}>
                <Box style={{ position: 'relative' }} className="my_swiper">
                  <Tooltip title={TooltipTitle.VIEW}>
                    <IconButton className="icon_preview" onClick={() => handleOpen(row.url)}>
                      <VisibilityRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <img onClick={() => handleOpen(row.url)} src={row.url} alt={row.titlle} />
                </Box>
              </SwiperSlide>
            ))
          ) : (
            <Skeleton variant="rectangular" />
          )}
        </Swiper>
      ) : null}
      <Modal open={open} onClose={handleClose} className="modal_swiper">
        <Box className="modal_box">
          <Swiper
            slidesPerView={1}
            initialSlide={banners.findIndex(row => row.url === selectedImg)}
          >
            {banners.length ? (
              banners.map(row => (
                <SwiperSlide key={row.id}>
                  <Box className="my_swiper">
                    <img src={row.url} alt={row.titlle} />
                  </Box>
                </SwiperSlide>
              ))
            ) : (
              <Skeleton variant="rectangular" />
            )}
          </Swiper>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
