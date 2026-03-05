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
import { Switch } from "@/components/ui/switch"
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
  Shield,
  Users,
  UserPlus,
  LogOut,
  Settings,
  Lock,
  Check,
  X,
} from "lucide-react"
import { clearAuthData, getAuthRole } from "@/lib/api/client"
import {
  getSuperAdminDashboard,
  createAdmin,
  updateAdminPermissions,
  deactivateAdmin,
} from "@/lib/api/superAdminApi"
import pixelLogo from "../../public/images/pixel-insure-logo.png"

interface AdminProfile {
  id: string
  userId: string
  name: string
  email: string | null
  status: string
  canCreateCustomer: boolean
  canEditCustomer: boolean
  canDeleteCustomer: boolean
  canViewReports: boolean
  canManageOnboarding: boolean
  assignedCustomers: string[]
  createdAt: string
}

interface AdminUser {
  id: string
  phone: string
  role: string
  createdAt: string
  adminProfile: AdminProfile | null
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [totalAdmins, setTotalAdmins] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [newAdmin, setNewAdmin] = useState({
    phone: "",
    name: "",
    email: "",
    canCreateCustomer: true,
    canEditCustomer: true,
    canDeleteCustomer: false,
    canViewReports: true,
    canManageOnboarding: true,
  })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getSuperAdminDashboard()
      if (res.admins) {
        setAdmins(res.admins)
      }
      setTotalAdmins(res.totalAdmins || 0)
      setTotalCustomers(res.totalCustomers || 0)
    } catch (err: any) {
      console.error("Dashboard load failed:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const role = getAuthRole()
    if (role !== "SUPER_ADMIN") {
      router.push("/superadmin/login")
      return
    }
    loadDashboard()
  }, [router, loadDashboard])

  const handleCreateAdmin = async () => {
    if (!newAdmin.phone || !newAdmin.name) {
      setError("Phone and name are required")
      return
    }
    try {
      setCreating(true)
      setError("")
      await createAdmin({
        phone: newAdmin.phone,
        name: newAdmin.name,
        email: newAdmin.email || undefined,
        permissions: {
          canCreateCustomer: newAdmin.canCreateCustomer,
          canEditCustomer: newAdmin.canEditCustomer,
          canDeleteCustomer: newAdmin.canDeleteCustomer,
          canViewReports: newAdmin.canViewReports,
          canManageOnboarding: newAdmin.canManageOnboarding,
        },
      })
      setCreateDialogOpen(false)
      setNewAdmin({
        phone: "",
        name: "",
        email: "",
        canCreateCustomer: true,
        canEditCustomer: true,
        canDeleteCustomer: false,
        canViewReports: true,
        canManageOnboarding: true,
      })
      await loadDashboard()
    } catch (err: any) {
      setError(err.message || "Failed to create admin")
    } finally {
      setCreating(false)
    }
  }

  const handleUpdatePermissions = async (
    adminId: string,
    permissions: Record<string, boolean>
  ) => {
    try {
      await updateAdminPermissions(adminId, permissions)
      await loadDashboard()
    } catch (err: any) {
      console.error("Permission update failed:", err)
    }
  }

  const handleDeactivateAdmin = async (adminId: string) => {
    try {
      await deactivateAdmin(adminId)
      await loadDashboard()
    } catch (err: any) {
      console.error("Deactivation failed:", err)
    }
  }

  const handleLogout = () => {
    clearAuthData()
    router.push("/superadmin/login")
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
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1 border-destructive/50 text-destructive"
            >
              <Shield className="w-3.5 h-3.5" />
              SuperAdmin
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
                  <p className="text-sm text-muted-foreground">Total Admins</p>
                  <p className="text-2xl font-bold">{totalAdmins}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Customers
                  </p>
                  <p className="text-2xl font-bold">{totalCustomers}</p>
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
                  <p className="text-sm text-muted-foreground">Active Admins</p>
                  <p className="text-2xl font-bold">
                    {
                      admins.filter(
                        (a) => a.adminProfile?.status === "active"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Management Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>
                Create and manage admin accounts with granular permissions
              </CardDescription>
            </div>
            <Dialog
              open={createDialogOpen}
              onOpenChange={setCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="gap-1.5">
                  <UserPlus className="w-4 h-4" />
                  Create Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Admin</DialogTitle>
                  <DialogDescription>
                    Add a new admin with specific permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="10-digit mobile number"
                      value={newAdmin.phone}
                      onChange={(e) =>
                        setNewAdmin({
                          ...newAdmin,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Admin name"
                      value={newAdmin.name}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email (Optional)</Label>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      value={newAdmin.email}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Permissions</Label>
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
                      <div
                        key={perm.key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{perm.label}</span>
                        <Switch
                          checked={newAdmin[perm.key]}
                          onCheckedChange={(checked) =>
                            setNewAdmin({ ...newAdmin, [perm.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <Button
                    className="w-full"
                    onClick={handleCreateAdmin}
                    disabled={creating}
                  >
                    {creating ? "Creating..." : "Create Admin"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {admins.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No admins created yet</p>
                <p className="text-sm">
                  Click "Create Admin" to add your first admin
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Customers</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          {admin.adminProfile?.name || "N/A"}
                        </TableCell>
                        <TableCell>{admin.phone}</TableCell>
                        <TableCell>
                          {admin.adminProfile?.email || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              admin.adminProfile?.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {admin.adminProfile?.status || "unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {admin.adminProfile?.assignedCustomers?.length || 0}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {admin.adminProfile?.canCreateCustomer && (
                              <Badge variant="outline" className="text-xs">
                                Create
                              </Badge>
                            )}
                            {admin.adminProfile?.canEditCustomer && (
                              <Badge variant="outline" className="text-xs">
                                Edit
                              </Badge>
                            )}
                            {admin.adminProfile?.canDeleteCustomer && (
                              <Badge variant="outline" className="text-xs">
                                Delete
                              </Badge>
                            )}
                            {admin.adminProfile?.canViewReports && (
                              <Badge variant="outline" className="text-xs">
                                Reports
                              </Badge>
                            )}
                            {admin.adminProfile?.canManageOnboarding && (
                              <Badge variant="outline" className="text-xs">
                                Onboarding
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAdmin(admin)
                                setPermissionsDialogOpen(true)
                              }}
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </Button>
                            {admin.adminProfile?.status === "active" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleDeactivateAdmin(admin.id)
                                }
                              >
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permissions Dialog */}
        <Dialog
          open={permissionsDialogOpen}
          onOpenChange={setPermissionsDialogOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Manage Permissions -{" "}
                {selectedAdmin?.adminProfile?.name || "Admin"}
              </DialogTitle>
              <DialogDescription>
                Toggle permissions for this admin account
              </DialogDescription>
            </DialogHeader>
            {selectedAdmin?.adminProfile && (
              <div className="space-y-4 pt-2">
                {[
                  {
                    key: "canCreateCustomer",
                    label: "Create Customer",
                    desc: "Allow creating new customer accounts",
                  },
                  {
                    key: "canEditCustomer",
                    label: "Edit Customer",
                    desc: "Allow editing customer profiles",
                  },
                  {
                    key: "canDeleteCustomer",
                    label: "Delete Customer",
                    desc: "Allow deleting customer accounts",
                  },
                  {
                    key: "canViewReports",
                    label: "View Reports",
                    desc: "Access to analytics and reports",
                  },
                  {
                    key: "canManageOnboarding",
                    label: "Manage Onboarding",
                    desc: "Manage customer onboarding flow",
                  },
                ].map((perm) => (
                  <div
                    key={perm.key}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="text-sm font-medium">{perm.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {perm.desc}
                      </p>
                    </div>
                    <Switch
                      checked={
                        (selectedAdmin.adminProfile as any)?.[perm.key] || false
                      }
                      onCheckedChange={(checked) =>
                        handleUpdatePermissions(selectedAdmin.id, {
                          [perm.key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
