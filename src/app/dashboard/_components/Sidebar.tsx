"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
 import { LayoutDashboard, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
function Sidebar() {
    const MenuList = [
           {
             name: 'Dashboard',
             icon: LayoutDashboard,
             path: '/dashboard'
           },
           {
            name: 'Upgarde',
            icon: UserCircle,
            path: '/dashboard/upgrade'
           },
           {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
           }
    ]
    const path = usePathname();
  return (
    <div className='h-screen shadow-md p-5'>
           <div className='flex gap-2 items-center'> 
             <Image src = {'/logo.svg'} alt='logo' width={40} height={40}/>
             <h2 className='font-bold text-2xl'>Easy Study</h2>
            </div> 
          
          <div className='mt-10'>
            <Link href={'/create'} className='w-full'>
            <Button className='w-full'>+ Create New</Button>
            </Link>
             <div className='mt-5'>
                {MenuList.map((menu,index)=>(
                    <div key={index} className={`flex gap-5 items-center p-3
                        hover:bg-slate-300 rounded-lg cursor-pointer mt-3 ${path == menu.path ? 'bg-slate-200' : ''}`}>
                        <menu.icon/>  
                        <h2>{menu.name}</h2> 
                        </div>
                ))}
             </div>
          </div>
          <div className='border p-3 bg-slate-100 rounded-lg
           absolute bottom-10 w-[85%] justify-between'>
            <h2 className='text-lg mb-2'>Available credits: 5</h2>
            <Progress value ={40}/>
            <h2 className='text-sm'> 1 out of 5 credits left</h2>
            <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgade to Create more</Link>
          </div>
          
         
          
    </div>
  )
}

export default Sidebar