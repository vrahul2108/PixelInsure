"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Users,
  UserPlus,
  LogOut,
  Eye,
  Check,
  X,
  Shield,
} from "lucide-react"
import { clearAuthData, getAuthRole } from "@/lib/api/client"
import {
  getAdminDashboard,
  getAssignedCustomers,
  getCustomerProfile,
  createCustomer,
} from "@/lib/api/adminApi"
import pixelLogo from "../../public/images/pixel-insure-logo.png"

interface Permission {
  canCreateCustomer: boolean
  canEditCustomer: boolean
  canDeleteCustomer: boolean
  canViewReports: boolean
  canManageOnboarding: boolean
}

interface CustomerUser {
  id: string
  phone: string
  onboardingStep: number
  profile?: {
    name: string
    gender: string
    age: number
    onboardingCompleted: boolean
  } | null
}

interface CustomerFullProfile {
  user: { id: string; phone: string; onboardingStep: number }
  profile: any
  family: any
  health: any
  coverage: any
  financial: any
  policy: any
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [permissions, setPermissions] = useState<Permission>({
    canCreateCustomer: false,
    canEditCustomer: false,
    canDeleteCustomer: false,
    canViewReports: false,
    canManageOnboarding: false,
  })
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [customers, setCustomers] = useState<CustomerUser[]>([])
  const [selectedCustomerProfile, setSelectedCustomerProfile] =
    useState<CustomerFullProfile | null>(null)
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newCustomerPhone, setNewCustomerPhone] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      const [dashRes, custRes] = await Promise.all([
        getAdminDashboard(),
        getAssignedCustomers(),
      ])

      if (dashRes.permissions) {
        setPermissions(dashRes.permissions)
      }
      setTotalCustomers(dashRes.totalCustomers || 0)

      if (custRes.customers) {
        setCustomers(custRes.customers)
      }
    } catch (err: any) {
      console.error("Dashboard load failed:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const role = getAuthRole()
    if (role !== "ADMIN") {
      router.push("/admin/login")
      return
    }
    loadDashboard()
  }, [router, loadDashboard])

  const handleViewProfile = async (customerId: string) => {
    try {
      const res = await getCustomerProfile(customerId)
      setSelectedCustomerProfile(res)
      setProfileDialogOpen(true)
    } catch (err: any) {
      console.error("Failed to load profile:", err)
    }
  }

  const handleCreateCustomer = async () => {
    if (!newCustomerPhone || newCustomerPhone.length !== 10) {
      setError("Enter valid 10-digit phone number")
      return
    }
    try {
      setCreating(true)
      setError("")
      await createCustomer(newCustomerPhone)
      setCreateDialogOpen(false)
      setNewCustomerPhone("")
      await loadDashboard()
    } catch (err: any) {
      setError(err.message || "Failed to create customer")
    } finally {
      setCreating(false)
    }
  }

  const handleLogout = () => {
    clearAuthData()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={pixelLogo}
              alt="PixelInsure"
              width={180}
              height={36}
              className="h-7 w-auto sm:h-9"
              priority
            />
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5 px-3 py-1">
              <Users className="w-3.5 h-3.5" />
              Admin
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Assigned Customers
                  </p>
                  <p className="text-2xl font-bold">{totalCustomers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Onboarded Customers
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      customers.filter(
                        (c) => c.profile?.onboardingCompleted
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Your Permissions
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      Object.values(permissions).filter(Boolean).length
                    }
                    /5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Your Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "canCreateCustomer" as const,
                  label: "Create Customer",
                },
                {
                  key: "canEditCustomer" as const,
                  label: "Edit Customer",
                },
                {
                  key: "canDeleteCustomer" as const,
                  label: "Delete Customer",
                },
                {
                  key: "canViewReports" as const,
                  label: "View Reports",
                },
                {
                  key: "canManageOnboarding" as const,
                  label: "Manage Onboarding",
                },
              ].map((perm) => (
                <Badge
                  key={perm.key}
                  variant={permissions[perm.key] ? "default" : "secondary"}
                  className="gap-1"
                >
                  {permissions[perm.key] ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                  {perm.label}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Assigned Customers</CardTitle>
              <CardDescription>
                View and manage your assigned customer accounts
              </CardDescription>
            </div>
            {permissions.canCreateCustomer && (
              <Dialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Create Customer</DialogTitle>
                    <DialogDescription>
                      Add a new customer by their phone number
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 border rounded-md bg-muted text-sm">
                          +91
                        </div>
                        <Input
                          placeholder="10-digit number"
                          value={newCustomerPhone}
                          onChange={(e) =>
                            setNewCustomerPhone(
                              e.target.value.replace(/\D/g, "")
                            )
                          }
                          maxLength={10}
                        />
                      </div>
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button
                      className="w-full"
                      onClick={handleCreateCustomer}
                      disabled={creating}
                    >
                      {creating ? "Creating..." : "Create Customer"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No customers assigned yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Onboarding</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          {customer.profile?.name || "Not started"}
                        </TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          Step {customer.onboardingStep}/6
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.profile?.onboardingCompleted
                                ? "default"
                                : "secondary"
                            }
                          >
                            {customer.profile?.onboardingCompleted
                              ? "Completed"
                              : "In Progress"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(customer.id)}
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Profile Dialog */}
        <Dialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Customer Profile -{" "}
                {selectedCustomerProfile?.profile?.name ||
                  selectedCustomerProfile?.user?.phone ||
                  "N/A"}
              </DialogTitle>
              <DialogDescription>
                Full customer profile across all onboarding steps
              </DialogDescription>
            </DialogHeader>
            {selectedCustomerProfile && (
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="basic">
                  <AccordionTrigger>Basic Info</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.profile}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="family">
                  <AccordionTrigger>Family</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.family}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="health">
                  <AccordionTrigger>Health</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.health}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="coverage">
                  <AccordionTrigger>Coverage</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.coverage}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="financial">
                  <AccordionTrigger>Financial</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.financial}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="policy">
                  <AccordionTrigger>Policy</AccordionTrigger>
                  <AccordionContent>
                    <ProfileSection
                      data={selectedCustomerProfile.policy}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

function ProfileSection({ data }: { data: any }) {
  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">No data available yet</p>
    )
  }

  const excludeKeys = [
    "id",
    "userId",
    "createdAt",
    "updatedAt",
    "UserProfile",
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {Object.entries(data)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value]) => (
          <div key={key} className="space-y-0.5">
            <p className="text-xs text-muted-foreground capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </p>
            <p className="text-sm font-medium">
              {value === null || value === undefined
                ? "-"
                : typeof value === "boolean"
                  ? value
                    ? "Yes"
                    : "No"
                  : Array.isArray(value)
                    ? value.length > 0
                      ? value.join(", ")
                      : "-"
                    : String(value)}
            </p>
          </div>
        ))}
    </div>
  )
}
