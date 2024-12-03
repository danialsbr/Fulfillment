'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Layout } from '@/components/layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

const PersonalInfo = dynamic(() => import('./personal-info').then(mod => mod.PersonalInfo), {
  loading: () => <LoadingCard title="Personal Information" />,
})

const Security = dynamic(() => import('./security').then(mod => mod.Security), {
  loading: () => <LoadingCard title="Security Settings" />,
})

function LoadingCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default function ProfileSettingsPage() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
  })

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated personal info to your backend
    console.log('Updating personal info:', personalInfo)
    // Implement your update logic here
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new password to your backend
    console.log('Changing password')
    // Implement your password change logic here
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Profile Settings</h1>
      <Tabs defaultValue="personal-info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <Suspense fallback={<LoadingCard title="Loading..." />}>
          <TabsContent value="personal-info">
            <PersonalInfo
              personalInfo={personalInfo}
              handlePersonalInfoChange={handlePersonalInfoChange}
              handlePersonalInfoSubmit={handlePersonalInfoSubmit}
            />
          </TabsContent>
          <TabsContent value="security">
            <Security
              password={password}
              handlePasswordChange={handlePasswordChange}
              handlePasswordSubmit={handlePasswordSubmit}
            />
          </TabsContent>
        </Suspense>
      </Tabs>
    </Layout>
  )
}

