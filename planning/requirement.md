# Supply Chain Shopping Website – Functional Requirements Document

## 1. Supplier Staff Registration

### Requirement Description
Suppliers can register and manage their product catalog. Email must be unique and valid. Upon successful registration, the system confirms registration; otherwise, displays errors.

### Registration Flow
```
Registration Page 
    ↓
Input Company Info/Email/Password
    ↓
Submit
    ↓
Validate Email Format and Uniqueness
    ↓
[Success] → Show Confirmation
    ↓
[Failure] → Show Error Message
```

## 2. Buyer Registration

### Requirement Description
Corporate buyers can register for an account. Company email domain must be validated against approved corporate domains. New buyer accounts require supervisor approval before activation.

### Features
- Company domain validation
- Automatic supervisor assignment based on company domain
- Email verification required
- Two-factor authentication setup (optional)
- Terms and conditions acceptance required

### Registration Flow
```
Registration Page
    ↓
Input Company Email/Company Info/Password
    ↓
Submit
    ↓
Validate Email Domain & Format
    ↓
[Valid Domain] → Create Pending Account
    ↓
Send Verification Email & Notify Supervisor
    ↓
[Email Verified & Supervisor Approved] → Account Activated
    ↓
[Invalid Domain/Rejected] → Show Error Message
```

### Validation Rules
| Rule | Action |
|------|---------|
| Email domain not in approved list | Show error message; prevent registration |
| Email already registered | Show error message; prevent registration |
| Password complexity requirements | Show requirements; prevent weak passwords |
| Company info incomplete | Show required fields; prevent submission |

## 3. Buyer Login

### Requirement Description
Corporate buyers can log in using their company email and password. Successful login redirects to the product catalog dashboard.

### Login Flow
```
Login Page
    ↓
Enter Email/Password
    ↓
Submit
    ↓
Validate Credentials
    ↓
[Success] → Redirect to Dashboard
    ↓
[Failure] → Show Error Message
```

## 4. Browse Supplier Product Catalog

### Requirement Description
Buyers browse approved suppliers' products with product image, product name, product detail, price, and amount that can be selected by buyer. 


## 5. View Product Details

### Requirement Description
Clicking on a product opens the product detail page, where buyers can view full specifications.

## 6. Purchase Request (Cart) Management

### Requirement Description
Buyers create and manage a centralized Purchase Request Cart for multiple products from different suppliers.

### Features
- Add items to cart from Product Detail Page with quantity selection
- View all added products in Purchase Request Page
- Adjust quantities or remove items before submission
- Cart icon displays total unique items

### Validation Rules
| Rule | Action |
|------|---------|
| Quantity < Minimum Order Quantity | Show error message; prevent action |
| Quantity > Available Stock | Show error message; prevent action |
| Totals auto-calculated | Dynamic update |

### User Flow
```
Product Catalog
    ↓
Product Detail Page
    ↓
Specify Quantity
    ↓
Add to Purchase Request
    ↓
Validate Quantity
    ↓
Add Item to Cart
    ↓
Update Cart Item Count
    ↓
Purchase Request Page
    ↓
Review/Modify/Remove Items
```

## 7. Submit Purchase Request and Approval

### Requirement Description
Buyers submit the purchase request for supervisor approval. 

### Request Status Flow
1. Draft
2. Submitted
3. Approved / Rejected
4. Completed

```
Purchase Request Page
    ↓
Submit for Approval
    ↓
Supervisor Review
    ↓
[Approved] → Status: Approved → Notify Buyer
    ↓
[Rejected] → Status: Rejected → Notify Buyer
```

## 8. Purchase Request History

### Requirement Description
Buyers view past purchase requests, including request ID, submission date, total value, and status. Click to view full request details.

### UI Layout
```
+---------------------------------------------------+
|               Purchase Request History              |
+---------------------------------------------------+
| Request ID | Date Submitted | Total | Status       |
| 2024071801 | 2025-07-18    | $5000 | Approved     |
| 2024071802 | 2025-07-18    | $1200 | In Review    |
+---------------------------------------------------+
| [View Details]                                     |
+---------------------------------------------------+
```

## 9. Inventory Monitoring and Alerts

### Requirement Description
System monitors inventory levels. When stock falls below threshold, it triggers alerts to procurement staff, with direct action to reorder items.

### Alert Flow
```
Monitor Inventory
    ↓
If Stock < Threshold
    ↓
Trigger Alert
    ↓
[Option] → Add to Purchase Request
```
