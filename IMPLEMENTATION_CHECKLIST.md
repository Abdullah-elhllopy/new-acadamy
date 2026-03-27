# ✅ API Integration Implementation Checklist

## Phase 1: Setup (5 minutes)

- [ ] Create `.env.local` file
- [ ] Add `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000` (or your API URL)
- [ ] Verify backend is running
- [ ] Test a simple API call (e.g., GET /api/Course/All-Courses)

## Phase 2: Replace Mock Data (Per Feature)

### Home Page
- [ ] Replace mock sliders with `useSliders()`
- [ ] Replace mock courses with `useCourses()` or `useCoursesFilterByBool()`
- [ ] Replace mock trainers with `useTrainers()`
- [ ] Replace mock partners with `usePartners()`
- [ ] Replace email subscription with `useCreateEmailSubscription()`

### About Us Page
- [ ] Replace mock about data with `useAboutUs()`
- [ ] Display vision, mission, values from API
- [ ] Show contact information from API

### Courses Pages
- [ ] `/all-programs` - Use `useCourses()`
- [ ] `/presence-courses` - Use `useCoursesFilterByBool({ now: true })`
- [ ] `/programs/[id]` - Use `useCourse(id)`
- [ ] Add filter functionality with `useCoursesFilterByCategory()`
- [ ] Add search with `useCoursesFilterByName()`

### Trainers Pages
- [ ] `/trainers` - Use `useTrainers()`
- [ ] `/trainers/[id]` - Use `useTrainer(id)`
- [ ] `/be-trainer` - Use `useCreateBeTrainerRequest()`

### Team & Partners
- [ ] `/our-team` - Use `useTeamMembers()`
- [ ] `/our-partners` - Use `usePartners()`
- [ ] `/our-customers` - Use appropriate hook (if API exists)

### Contact & Requests
- [ ] `/contact` - Use `useCreateContactMessage()`
- [ ] Training request forms - Use `useCreateTrainingRequest()`
- [ ] Email subscription - Use `useCreateEmailSubscription()`

### Images Center
- [ ] `/images-center` - Use `useImageGroups()`
- [ ] `/images-center/[id]` - Use `useImagesByGroup(groupId)`

### Departments
- [ ] Main departments - Use `useMainDepartments()`
- [ ] Sub departments - Use `useSubDepartments()`

### User Dashboard (if applicable)
- [ ] My courses - Use appropriate hook
- [ ] My certificates - Use appropriate hook
- [ ] Profile settings - Use `useUpdateProfile()`

## Phase 3: Admin Dashboard (If Building)

### Courses Management
- [ ] List courses - `useCourses()`
- [ ] Create course - `useCreateCourse()`
- [ ] Edit course - `useUpdateCourse()`
- [ ] Delete course - `useDeleteCourse()`
- [ ] Add WWWL - `useAddWWWL()`

### Trainers Management
- [ ] List trainers - `useTrainers()`
- [ ] Create trainer - `useCreateTrainer()`
- [ ] Edit trainer - `useUpdateTrainer()`
- [ ] Delete trainer - `useDeleteTrainer()`

### Departments Management
- [ ] List main departments - `useMainDepartments()`
- [ ] Create main department - `useCreateMainDepartment()`
- [ ] Edit main department - `useUpdateMainDepartment()`
- [ ] Delete main department - `useDeleteMainDepartment()`
- [ ] List sub departments - `useSubDepartments()`
- [ ] Create sub department - `useCreateSubDepartment()`
- [ ] Edit sub department - `useUpdateSubDepartment()`
- [ ] Delete sub department - `useDeleteSubDepartment()`

### Requests Management
- [ ] View training requests - `useTrainingRequests()`
- [ ] Update request status - `useUpdateTrainingRequestStatus()`
- [ ] View be-trainer requests - `useBeTrainerRequests()`
- [ ] Update trainer request status - `useUpdateBeTrainerRequestStatus()`
- [ ] View contact messages - `useContactMessages()`
- [ ] View email subscriptions - `useEmailSubscriptions()`

### Content Management
- [ ] Manage sliders - `useSliders()`, `useCreateSlider()`, etc.
- [ ] Manage partners - `usePartners()`, `useCreatePartner()`, etc.
- [ ] Manage team - `useTeamMembers()`, `useCreateTeamMember()`, etc.
- [ ] Manage about us - `useAboutUs()`, `useUpdateAboutUs()`
- [ ] Manage image groups - `useImageGroups()`, `useCreateImageGroup()`, etc.
- [ ] Manage images - `useImagesByGroup()`, `useCreateImage()`, etc.

## Phase 4: Testing

### Functional Testing
- [ ] Test all GET requests (data fetching)
- [ ] Test all POST requests (creating data)
- [ ] Test all PUT/PATCH requests (updating data)
- [ ] Test all DELETE requests (deleting data)
- [ ] Test file uploads (images, PDFs, CVs)
- [ ] Test form validations

### Error Handling
- [ ] Test with backend offline (network errors)
- [ ] Test with invalid data (validation errors)
- [ ] Test with expired token (401 errors)
- [ ] Test with insufficient permissions (403 errors)
- [ ] Verify toast notifications appear

### Loading States
- [ ] Verify loading indicators show
- [ ] Verify skeleton loaders work
- [ ] Verify disabled states during mutations

### Edge Cases
- [ ] Test with empty data (no courses, no trainers, etc.)
- [ ] Test with very long text
- [ ] Test with special characters
- [ ] Test with large files
- [ ] Test concurrent requests

## Phase 5: Optimization

### Performance
- [ ] Add loading skeletons where needed
- [ ] Implement pagination for large lists
- [ ] Add infinite scroll if needed
- [ ] Optimize images (use Next.js Image component)
- [ ] Add prefetching on hover (advanced)

### User Experience
- [ ] Add confirmation dialogs for delete actions
- [ ] Add success messages after mutations
- [ ] Add error messages with helpful text
- [ ] Add empty states with call-to-action
- [ ] Add loading states for better feedback

### Code Quality
- [ ] Remove all console.logs
- [ ] Add proper error boundaries
- [ ] Add TypeScript types where missing
- [ ] Remove unused imports
- [ ] Format code consistently

## Phase 6: Documentation

### Code Documentation
- [ ] Add JSDoc comments to complex functions
- [ ] Document custom hooks if created
- [ ] Add README for each major feature

### User Documentation
- [ ] Create user guide (if needed)
- [ ] Document admin features
- [ ] Create API documentation for team

## Phase 7: Deployment Preparation

### Environment Variables
- [ ] Set production API URL in Vercel/hosting
- [ ] Verify all environment variables are set
- [ ] Test with production API

### Security
- [ ] Verify JWT tokens are secure
- [ ] Check CORS settings
- [ ] Verify file upload restrictions
- [ ] Check rate limiting (if applicable)

### Final Checks
- [ ] Test all features in production
- [ ] Verify SSL/HTTPS works
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify SEO meta tags

## Progress Tracking

### Overall Progress
- [ ] Phase 1: Setup (0/4)
- [ ] Phase 2: Replace Mock Data (0/X)
- [ ] Phase 3: Admin Dashboard (0/X)
- [ ] Phase 4: Testing (0/X)
- [ ] Phase 5: Optimization (0/X)
- [ ] Phase 6: Documentation (0/X)
- [ ] Phase 7: Deployment (0/X)

### Estimated Time
- Phase 1: 5 minutes
- Phase 2: 2-4 hours (depending on pages)
- Phase 3: 4-8 hours (if building admin)
- Phase 4: 2-4 hours
- Phase 5: 2-4 hours
- Phase 6: 1-2 hours
- Phase 7: 1-2 hours

**Total: 12-24 hours** (depending on scope)

## Quick Wins (Start Here!)

1. [ ] Set up `.env.local` (5 min)
2. [ ] Replace home page courses with `useCourses()` (10 min)
3. [ ] Replace trainers list with `useTrainers()` (10 min)
4. [ ] Replace contact form with `useCreateContactMessage()` (15 min)
5. [ ] Replace email subscription with `useCreateEmailSubscription()` (10 min)

**Total: 50 minutes to see it working!**

## Common Issues & Solutions

### Issue: "Cannot find module '@/hooks/api'"
**Solution**: Check import path, ensure files exist

### Issue: "Network Error"
**Solution**: Verify `.env.local` has correct API URL

### Issue: "401 Unauthorized"
**Solution**: Check token is being sent, verify backend auth

### Issue: "CORS Error"
**Solution**: Configure backend to allow frontend domain

### Issue: "Data not updating"
**Solution**: Check cache invalidation in mutation hooks

## Need Help?

- [ ] Read `QUICK_START.md` for examples
- [ ] Check `API_INTEGRATION_GUIDE.md` for details
- [ ] Look at `components/examples/courses-example.tsx`
- [ ] Review `ARCHITECTURE.md` for understanding

## Notes

Add your notes here as you implement:

```
Date: ___________
Progress: ___________
Issues: ___________
Solutions: ___________
```

---

**Remember**: Start small, test often, commit frequently! 🚀
