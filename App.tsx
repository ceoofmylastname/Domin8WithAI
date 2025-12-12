const handleApplyClick = () => {
  setIsModalOpen(true)
}

return (
  <>
    <BackgroundMesh />
    <Hero onApplyClick={handleApplyClick} />
    <StorySection ref={storyRef} />
    <LiquidAudit ref={auditRef} />
    <BookingCTA />
    <CustomCursor />
    <MarcusChat />
    <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
  </>
)
}

export default App
