import { Inngest } from "inngest";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "task-manager" });

// Create an empty array where we'll export future Inngest functions


// create user 
 const syncUserCreation = inngest.createFunction(
        {
            id:'sync-user-from-clerk'
        },
        {event:'clerk/user.created'},
        async({event})=>{
            const {data} = event;
            await prisma.user.create({
                data:{
                    id:data.id,
                    email:data?.email_addresses[0]?.email_address,
                    name:data?.first_name + " " + data?.last_name,
                    image:data?.image_url,

                }
            })

        }
    )

    // function to delete user 

    const syncUserDeletion = inngest.createFunction(
        {id:'sync-user-deletion-from-clerk'},
        {event:'clerk/user.deleted'},
        async({event})=>{
            const {data} = event;
            await prisma.user.deleteMany({
                where:{
                    id:data.id 
                }
            })
        }     
    )

    // fumction to update user

    const syncUserUpdate = inngest.createFunction(
        {id:'sync-user-update-from-clerk'},
        {event:'clerk/user.updated'},
        async({event})=>{
            const {data} = event;
            await prisma.user.update({
                where:{
                    id:data.id 
                },
                data:{
                    email:data?.email_addresses[0]?.email_address,
                    name:data?.first_name + " " + data?.last_name,
                    image:data?.image_url,
                }
            })
        }     
    )

    export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdate];
  

