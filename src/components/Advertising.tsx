import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { IMG_LIST, TooltipTitle } from 'commom/contants';
import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import { VisibilityRounded } from '@mui/icons-material';
import { useState } from 'react';

export const Advertising = () => {
  SwiperCore.use([Autoplay]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleOpen = (img: string) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        freeMode={true}
        modules={[Autoplay, FreeMode, Navigation]}
      >
        {IMG_LIST.map((row, idx) => (
          <SwiperSlide key={idx}>
            <Box style={{ position: 'relative' }} className="my_swiper">
              <Tooltip title={TooltipTitle.VIEW}>
                <IconButton className="icon_preview" onClick={() => handleOpen(row.img)}>
                  <VisibilityRounded fontSize="small" />
                </IconButton>
              </Tooltip>
              <img onClick={() => handleOpen(row.img)} src={row.img} alt={row.title} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal open={open} onClose={handleClose} className="modal_swiper">
        <Box className="modal_box">
          <img src={selectedImg as string} alt="Preview" />
        </Box>
      </Modal>
    </>
  );
};
