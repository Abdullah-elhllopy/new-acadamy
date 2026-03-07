export enum UserRole {
  VISITOR = 'visitor',
  TRAINEE = 'trainee',
  TRAINER_APPLICANT = 'trainer_applicant',
  CORPORATE_MANAGER = 'corporate_manager',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.VISITOR]: 'Visitor',
  [UserRole.TRAINEE]: 'Trainee',
  [UserRole.TRAINER_APPLICANT]: 'Trainer Applicant',
  [UserRole.CORPORATE_MANAGER]: 'Corporate Manager',
  [UserRole.STAFF]: 'Staff',
  [UserRole.ADMIN]: 'Administrator',
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.VISITOR]: ['view_programs', 'view_articles'],
  [UserRole.TRAINEE]: ['view_programs', 'book_programs', 'download_certificates', 'view_articles', 'comment_articles'],
  [UserRole.TRAINER_APPLICANT]: ['apply_trainer', 'edit_profile', 'view_programs', 'view_articles'],
  [UserRole.CORPORATE_MANAGER]: ['bulk_register', 'view_bookings', 'request_custom_programs', 'view_reports'],
  [UserRole.STAFF]: ['manage_programs', 'manage_sessions', 'review_bookings', 'manage_trainers', 'manage_content'],
  [UserRole.ADMIN]: ['full_access'],
}
