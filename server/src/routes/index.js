const {Router}=require('express');
const {cardRouter}=require('./CardRouters.js');
const {userRouter}=require('./UserRouters.js');

const router=Router();
router.use('/card',cardRouter);
router.use('/user',userRouter);

module.exports=router;