import { notFound } from 'next/navigation';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getSellerData = async (id) => {

   const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
   })

   if(!user) return notFound();

   await prisma.$disconnect();

   return {
      user,
   };
};

export const deleteListings = async (id) => {
   const updateListing = await prisma.listing.update({
      where: {
        id: id,
      },
      data: {
        status: 'deleted',
      },
    })
    
   if(!updateListing) return notFound();

   await prisma.$disconnect();

   return {
      updateListing,
   };
}

export const getListings = async (id) => {

   const listings = await prisma.listing.findMany({
      where: {
        seller_id: Number(id),
        status: 'active'
      }
   })

   if(!listings) return notFound();

   await prisma.$disconnect()

   return {
      listings,
   };
};

export const getIndividuaListing = async (id) => {

   console.log(`LISTING ID: ${id}`);

   const listing = await prisma.listing.findUnique({
      where: {
        id: Number(id),
      }
   });

   if(!listing) return notFound();
   await prisma.$disconnect();

   return {
      listing,
   };
};

export const editListing = async ({ id, name, description, price }) => {

   const listing = await prisma.listing.update({
      where: {
         id: Number(id),
      },
      data: {
         name,
         description,
         price,
      },
   })

   if(!listing) return notFound();
   await prisma.$disconnect();

   return {
      listing,
   };
};

export const createListings = async ({ name, description, price, user_id }) => {

   const listing = await prisma.listing.create({
      data: {
         name,
         description,
         price,
         status: 'active',
         seller_id: user_id,
      },
   })

   if(!listing) return notFound();
   await prisma.$disconnect();

   return {
      listing,
   };
};

export const findListings = async (name) => {

   const listings = await prisma.listing.findMany({
      where: {
        name: {
         contains: name
        },
        status: 'active'
      }
   })

   await prisma.$disconnect();

   return {
      listings,
   };
};

export const findBids = async (id) => {

   const bids = await prisma.bids.findMany({
      where: {
        listing_id: Number(id),
        status: 'pending'
      }
   });

   await prisma.$disconnect();

   return {
      bids,
   };
};

export const enquireListing = async ({ id, userId }) => {

   const listings = await prisma.listing.update({
      where: {
        id,
      },
      data: {
         status: 'sold',
         purchase_user_id: userId,
         purchase_type: 'direct',
      },
   })

   await prisma.$disconnect();

   return {
      listings,
   };
};

export const bidListing = async ({ userId, price, listingId }) => {

   const listing = await prisma.bids.create({
      data: {
         user_id: userId,
         price,
         listing_id: listingId,
         status: 'pending'
      },
   })

   if(!listing) return notFound();
   await prisma.$disconnect();

   return {
      listing,
   };
};

export const acceptBid = async ({ id, listingId, userId }) => {

   const updateBids = await prisma.bids.updateMany({
      where: {
        listing_id: listingId,
      },
      data: {
        status: 'rejected',
      },
   });

   await prisma.bids.update({
      where: {
        id,
      },
      data: {
         status: 'accepted',
      },
   });

   await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
         bid_id: id,
         status: 'sold',
         purchase_user_id: userId,
         purchase_type: 'bid',
      },
   })

   await prisma.$disconnect();

   return {
      updateBids,
   };
};